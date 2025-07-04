import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AddPostsComponent } from './components/blog/add-posts/add-posts.component';
import { CategoryComponent } from './components/blog/category/category.component';
import { EditProfileComponent } from './components/users/edit-profile/edit-profile.component';
import { HomeComponent } from './components/painel/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ListPostsComponent } from './components/blog/list-posts/list-posts.component';
import { AddPropertyComponent } from './components/properties/add-property/add-property.component';
import { ListPropertyComponent } from './components/properties/list-property/list-property.component';
import { CategoryPropertyComponent } from './components/properties/category-property/category-property.component';
import { DepoimentosComponent } from './components/depoimentos/depoimentos.component';
import { AuthGuardService } from '../../guards/auth-guard.service';

const routes: Routes = [
  {
    path : '',
    component: AdminComponent,
    children: [
      {path: 'home', component: HomeComponent },

      {path: 'add-posts', component: AddPostsComponent},
      {path: 'edit-posts/:id', component: AddPostsComponent},
      {path: 'list-posts', component: ListPostsComponent},

      {path: 'add-category', component: CategoryComponent},
      {path: 'edit-category/:id', component: CategoryComponent},

      {path: 'add-category-property', component: CategoryPropertyComponent},
      {path: 'add-property', component: AddPropertyComponent},
      {path: 'edit-property/:id', component: AddPropertyComponent},
      {path: 'list-properties', component: ListPropertyComponent},

      {path: 'depositions', component: DepoimentosComponent},

      {path: 'users', component: UsersComponent},
      {path: 'edit-profile/:id', component: EditProfileComponent},

      {path: 'edit-theme', loadChildren: () => import('./components/edit-theme/edit-theme.module').then(m => m.EditThemeModule) },
      {path: '', pathMatch: 'full', redirectTo: 'home'},
    ],
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
