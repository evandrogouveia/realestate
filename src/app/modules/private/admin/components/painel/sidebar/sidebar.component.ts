import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/login/model/user.model';
import { LoginService } from 'src/app/modules/login/service/login.service';
import { SidebarService } from '../../../services/sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  retract: string;
  isCollapsedA = false;
  isCollapsedB = false;
  isCollapsedC = false;
  isCollapsedD = false;

  currentUser = [];

  constructor(
    private sidebarService: SidebarService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.sidebarService.obterToggle()
      .subscribe(valor => { // setar o valor vindo do service na variável.
        this.retract = valor;
    });
    this.loginService.getUser().subscribe(user => {
      this.currentUser = user[0];
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleNavbar();
  }
}
