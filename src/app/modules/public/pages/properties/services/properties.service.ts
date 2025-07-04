import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propriedades } from 'src/app/modules/private/admin/components/properties/models/propriedades.model';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor() { }

  //LISTAR PROPRIEDADES
  getProperties(){
    return;
  }

  //LISTAR PROPRIEDADE POR ID
  getPropertyDetail(propertyId: string): Observable<Propriedades>{
    return;
  }

}
