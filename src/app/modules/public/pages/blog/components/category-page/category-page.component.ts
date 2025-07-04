import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { PostService } from 'src/app/modules/private/admin/components/blog/services/post.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  posts$: Observable<Post>
  valueFilter: any;

  constructor(
    private postsService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getPost();

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event) => {
      if (event) {  this.getPost(); }
    });
  }

  getPost() {
    this.route.queryParams.subscribe(value => {
      this.valueFilter = value;
      this.posts$ = this.postsService.getSearchPosts(this.valueFilter[0]);
    });
  }

}
