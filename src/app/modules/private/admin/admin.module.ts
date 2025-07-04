import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/painel/home/home.component';
import { HeaderComponent } from './components/painel/header/header.component';
import { SidebarComponent } from './components/painel/sidebar/sidebar.component';
import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';
import { AddPostsComponent } from './components/blog/add-posts/add-posts.component';
import { CategoryComponent } from './components/blog/category/category.component';
import { UsersComponent } from './components/users/users.component';
import { EditProfileComponent } from './components/users/edit-profile/edit-profile.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ListPostsComponent } from './components/blog/list-posts/list-posts.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { BsModalRef } from 'ngx-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AddPropertyComponent } from './components/properties/add-property/add-property.component';
import { ListPropertyComponent } from './components/properties/list-property/list-property.component';
import { CategoryPropertyComponent } from './components/properties/category-property/category-property.component';
import { NgxMaskModule } from 'ngx-mask';
import { DepoimentosComponent } from './components/depoimentos/depoimentos.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    AddPostsComponent,
    CategoryComponent,
    UsersComponent,
    EditProfileComponent,
    ListPostsComponent,
    AddUserComponent,
    AddPropertyComponent,
    ListPropertyComponent,
    CategoryPropertyComponent,
    DepoimentosComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzC66os6ra-4rKS59FfISfCfxkK3YM6oo',
      libraries: ['places']
    }),*/
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    BsModalRef
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
