import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    GoogleMapsModule
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzC66os6ra-4rKS59FfISfCfxkK3YM6oo',
      libraries: ['places']
    }),*/
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContactModule { }
