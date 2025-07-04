import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/modules/login/model/user.model';
import { LoginService } from 'src/app/modules/login/service/login.service';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imageSrc = 'assets/img/icons/user-empty.svg';

  currentUser: any = [];

  constructor(
    private sidebarService: SidebarService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
     this.loginService.getUser().subscribe(user => {
      this.currentUser = user[0];
     });
  }

  toggleSidebar() {
    this.sidebarService.toggleNavbar();
  }

  logout() {
    this.loginService.logout();
  }

}
