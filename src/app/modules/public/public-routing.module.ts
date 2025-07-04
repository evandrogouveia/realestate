import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'quem-somos', loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule) },
      { path: 'propriedades', loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule) },
      { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) },
      { path: 'contato', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
      {path: '', pathMatch: 'full', redirectTo: 'home'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
