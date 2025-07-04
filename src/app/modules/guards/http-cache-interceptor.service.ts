import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheInterceptorService implements HttpInterceptor {

  private cache: Map<string, HttpResponse<any>> = new Map();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.method !== 'GET') {//Verifica se a solicitação pode ser cacheada
        return next.handle(req);
      }

      const cacheResponse = this.cache.get(req.url);
      if (cacheResponse) {// Se a resposta estiver em cache, retorne a resposta do cache
        return of(cacheResponse.clone());
      }

       // Se a resposta não estiver em cache, envie a solicitação normalmente
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
             // Armazene a resposta em cache para solicitações futuras
            this.cache.set(req.url, event.clone());
          }
        })
      )
  }
}
