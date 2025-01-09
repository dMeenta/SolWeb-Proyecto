import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { FriendsComponent } from './components/friends/friends.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { AuthStateService } from './shared/auth-state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FriendsComponent,
    RouterLinkActive,
    NgxSonnerToaster,
    HomeButtonComponent,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = '';
  hiddenRoutes: string[] = ['/auth/sign-up', '/auth/sign-in'];
  shouldHideLayout: boolean = false;
  userConnected: boolean = false;
  userId!: string;
  private _authState = inject(AuthStateService);

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.shouldHideLayout = this.hiddenRoutes.some((route) =>
        this.router.url.startsWith(route)
      );
    });
  }
  ngOnInit(): void {
    this._authState.authState$.subscribe((authUser) => {
      if (authUser) {
        this.userConnected = true;
        this.userId = authUser.uid;
      } else {
        this.userConnected = false;
      }
    });
  }

  async salir() {
    await this._authState.logOut();
  }
}
