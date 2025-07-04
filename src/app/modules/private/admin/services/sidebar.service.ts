import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = true;
  retract: string;

  private toggleBehaviorSubject = new BehaviorSubject<string>('toggled');

  constructor() { }

  toggleNavbar() {// método que faz o menu recolher
    this.toggled = !this.toggled;
    if (this.toggled === false) {
      this.retract = '';
    } else {
      this.retract = 'toggled';
    }
    this.toggleBehaviorSubject.next(this.retract);
  }

  obterToggle() { // obtém o valor de toggleBehaviorSubject
    return this.toggleBehaviorSubject;
  }
}
