import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { EditThemeRoutingModule } from './edit-theme-routing.module';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { EditFooterComponent } from './edit-footer/edit-footer.component';
import { EditBannerHomeComponent } from './edit-banner-home/edit-banner-home.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { EditThemeComponent } from './edit-theme.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    EditHeaderComponent, 
    EditFooterComponent, 
    EditBannerHomeComponent, 
    EditHomeComponent, 
    EditThemeComponent, 
    EditAboutComponent, 
    EditContactComponent,
  ],
  imports: [
    CommonModule,
    EditThemeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
    AngularEditorModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class EditThemeModule { }
