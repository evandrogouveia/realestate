import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { EditBannerHomeComponent } from './edit-banner-home/edit-banner-home.component';
import { EditFooterComponent } from './edit-footer/edit-footer.component';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { EditThemeComponent } from './edit-theme.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

const routes: Routes = [
  {
    path : '',
    component: EditThemeComponent,
    children: [
      {path: 'edit-header', component: EditHeaderComponent},
      {path: 'edit-footer', component: EditFooterComponent},
      {path: 'edit-banners', component: EditBannerHomeComponent},
      {path: 'edit-home', component: EditHomeComponent},
      {path: 'edit-about', component: EditAboutComponent},
      {path: 'edit-contact', component: EditContactComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditThemeRoutingModule { }
