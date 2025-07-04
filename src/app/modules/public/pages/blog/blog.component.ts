import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { PostService } from 'src/app/modules/private/admin/components/blog/services/post.service';
import { BlogService } from './services/blog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts$: Observable<Post>
  themeConfigSkeletonImage = {
    width: '97%',
    height: '100%',
    position: 'absolute',
    left: '0',
    'border-radius': '10px'
  }

  themeConfigSkeletonTitle = {
    width: '100%',
    height: '55px',
    position: 'absolute',
    'border-radius': '10px'
  }

  themeConfigSkeletonDate = {
    width: '100%',
    height: '25px',
    position: 'absolute',
    'border-radius': '5px',
    'z-index': '5'
  }

  themeConfigSkeletonDesc = {
    width: '100%',
    height: '115px',
    position: 'absolute',
    'border-radius': '10px'
  }

  constructor(private postsService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();
  }

}
