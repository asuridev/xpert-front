import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'x-navbar',
  imports:[
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private readonly userService:UserService
  ){}

  get isLogin(){
    return this.userService.getIslogin();
  }

  get email(){
    return this.userService.getEmail();
  }

  get userId(){
    return this.userService.getUserId();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
