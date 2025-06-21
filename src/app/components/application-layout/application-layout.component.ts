import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { NgClass } from '@angular/common';
import { MinimalUserInfo, SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-application-layout',
  imports: [HeaderComponent, RouterOutlet, AsideMenuComponent, NgClass],
  templateUrl: './application-layout.component.html',
  styleUrl: './application-layout.component.css',
})
export class ApplicationLayoutComponent implements OnInit {
  userLogged!: MinimalUserInfo;
  private _sharedService = inject(SharedService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserLoggedInfo();
  }

  async logout() {
    console.log('u log out');
  }

  isPageWidthFull() {
    const url = this.router.url;
    const segments = url.split('/').filter((seg) => seg);
    return segments[0] === 'game' || segments[0] === 'community';
  }

  getUserLoggedInfo() {
    this._sharedService.getUserLogged().subscribe({
      next: (res) => {
        if (!res.success) {
          console.error(res.message);
        }
        this.userLogged = res.data;
      },
    });
  }
}
