import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { SharedModule } from '../shared/shared.module';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { AsideLateralComponent } from './components/aside-lateral/aside-lateral.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

registerLocaleData(localePt);

@NgModule({
  declarations: [BlogComponent, SingleBlogComponent, AsideLateralComponent, SearchResultComponent, CategoryPageComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogModule { }
