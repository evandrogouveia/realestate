import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PostService } from 'src/app/modules/private/admin/components/blog/services/post.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit, AfterViewInit {
  post = [];
  url: any = 'https://real-estate-theme.vercel.app/';
  currentDate = new Date();
  scrollPosition;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostService
  ) { }

  ngOnInit(): void {
    this.getPostId();
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event) => {
      if (event) {  this.getPostId();   this.url = window.location.href; }
    });
  }

  getPostId() {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postsService.getPostID(postId).subscribe((post: any) => {
      post.map(p => p.categorias = p.categorias);
      this.post = post;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.url = window.location.href;
    }, 1000);
  }

  reloadPost() {
    this.getPostId();
  }



}
