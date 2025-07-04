import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzC66os6ra-4rKS59FfISfCfxkK3YM6oo',
      libraries: ['places']
    }),*/
  ]
})
export class ContactModule { }
