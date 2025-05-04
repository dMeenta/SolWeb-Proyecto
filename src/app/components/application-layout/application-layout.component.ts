import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserMSQL } from '../../models/UserMSQL';
import { AuthService } from '../../auth/data-access/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { NgClass } from '@angular/common';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-application-layout',
  imports: [HeaderComponent, RouterOutlet, AsideMenuComponent, NgClass],
  templateUrl: './application-layout.component.html',
  styleUrl: './application-layout.component.css',
})
export class ApplicationLayoutComponent implements OnInit {
  userLogged!: UserMSQL;
  private _authService = inject(AuthService);
  private _sharedService = inject(SharedService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = this._sharedService.getUserLogged();
    if (user) {
      this.userLogged = user;
      console.log(user);
    }
  }

  async logout(uid: string) {
    this._authService.logout(uid);
  }

  isPageWidthFull() {
    const url = this.router.url;
    const segments = url.split('/').filter((seg) => seg);
    return segments[0] === 'game' || segments[0] === 'community';
  }
}
