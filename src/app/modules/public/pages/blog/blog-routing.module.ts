import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';

const routes: Routes = [
  {
    path : '',
    component: BlogComponent
  },
  {
    path : 'single-blog/:id',
    component: SingleBlogComponent
  },
  {
    path : 'search-result',
    component: SearchResultComponent
  },
  {
    path : 'category-page',
    component: CategoryPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
