import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/service/login.service';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss']
})
export class AddPostsComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputCategories') inputCategories: QueryList<ElementRef>

  highlightedImage = 'assets/img/placeholder.jpg';
  selectedImage: any = null;

  currentDate = new Date();
  dataPublicacao;
  autor: any;

  selectedCategorias: any = [];
  isfrmChecked: boolean = false;
  loading:boolean = false;

  categoriesAll$: Observable<Category[]>;

  postId: string;
  isAddMode: boolean;
  myModel: any;

  addPostForm: FormGroup = this.fb.group({
    ID: [],
    titulo: [''],
    descricao: [''],
    dataPublicacao: [''],
    imagemDestacada: [''],
    categorias: [''],
    autor: ['']
  });

  constructor(
    private fb: FormBuilder,
    private postsService: PostService,
    private loginService: LoginService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.categoriesAll$ = this.categoryService.getAllCategorias();
    this.postId = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.postId;
    this.loginService.getUser().subscribe(u => {
      this.autor = u[0]?.nomeSocial;
    });
  }

  ngAfterViewInit(): void {
      this.setDataPosts();
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.highlightedImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.highlightedImage = 'assets/img/placeholder.jpg';
      this.selectedImage = null;
    }
  }

  checkCategory(event, isChecked) { //remove e adiciona a categoria selecionada no array selectedCategoryes
    isChecked = event.target.checked;

    if (isChecked) {
      this.isfrmChecked = true;
      this.selectedCategorias.push(event.target.value);
    } else {
      this.isfrmChecked = false;
      const index = this.selectedCategorias.indexOf(event.target.value)
      this.selectedCategorias.splice(index, 1);
    }
  }

  addUpdadePosts() {
    this.loading = true;
    this.addPostForm.controls.categorias.patchValue(this.selectedCategorias);
    this.addPostForm.controls.autor.patchValue(this.autor);

    const formData = new FormData();
    formData.append('imagemDestacada', this.selectedImage);

    formData.append('formPosts', JSON.stringify(this.addPostForm.value));

    if (this.isAddMode) {

      //remove as tags html da descrição
      const descricaoFormatada = this.addPostForm.value.descricao.replace(/<[^>]*>/g, '');
      this.addPostForm.value.descricao = descricaoFormatada;

      if (this.addPostForm.valid) {
        this.postsService.newPost(formData).subscribe(() => {
          this.reset();
          this.toastr.success('Post adicionado com sucesso', '');
          this.router.navigate(['private/admin/list-posts']);
        }, (err) => {
          console.log(err)
          this.loading = false;
          this.toastr.error('Ocorreu um erro ao adicionar o Post, tente novamente mais tarde', '');
        });
      } else {
        this.loading = false;
        this.toastr.error('Preencha os campos obrigatórios', '');
      }
    } else {
      this.postsService.updatePost(this.postId, formData).subscribe(() => {
        this.reset();
        this.toastr.success('Post atualizado com sucesso', '');
        this.router.navigate(['private/admin/list-posts']);
      }, (err) => {
        this.loading = false;
        this.toastr.error('Ocorreu um erro ao atualizar o Post, tente novamente mais tarde', '');
      });
    }
  }

  reset(): void {
    this.loading = false;
    this.highlightedImage = '';
    this.addPostForm.reset();
  }

  setDataPosts() {
    if (!this.isAddMode) {
      this.postsService.getPostID(this.postId).subscribe(data => {

        data[0].imagemDestacada ? this.highlightedImage= data[0].imagemDestacada : this.highlightedImage = 'assets/img/placeholder.jpg';

        this.addPostForm.patchValue(data[0]);
        this.addPostForm.controls.categorias.patchValue(data[0].categorias);
        this.selectedCategorias = data[0].categorias;
        this.dataPublicacao = data[0].dataPublicacao;

        setTimeout(() => {
          this.inputCategories.forEach(input => {
            if (data[0].categorias.includes(input.nativeElement.value)) {
              input.nativeElement.checked = true;
            }
          });
        });
      });
    }
  }


  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '35rem',
    minHeight: '1rem',
    placeholder: 'Digite o texto aqui...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'customClasses',
        'insertUnorderedList',
        'insertOrderedList',
      ]
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],

  };

}
