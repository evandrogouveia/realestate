import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryBannerPagesComponent } from './entry-banner-pages/entry-banner-pages.component';
import { ErrorInputComponent } from './error-input/error-input.component';
import { CardsPropertiesComponent } from './cards-properties/cards-properties.component';
import { LoadingComponent } from './loading/loading.component';
import { NgxLoadingModule,  ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    EntryBannerPagesComponent,
    ErrorInputComponent,
    CardsPropertiesComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    NgxBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes
    }),
    NgxMaskModule.forRoot()
  ],
  exports: [
    EntryBannerPagesComponent,
    ErrorInputComponent,
    CardsPropertiesComponent,
    LoadingComponent,
    NgxSkeletonLoaderModule,
    NgxLoadingModule,
    NgxBootstrapModule,
    NgxMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
