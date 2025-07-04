import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from './pages/shared/shared.module';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NgxMaskModule } from 'ngx-mask';
import localePt from '@angular/common/locales/pt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCacheInterceptorService } from '../guards/http-cache-interceptor.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptorService,
      multi: true
    },*/
  ]
})
export class PublicModule { }
