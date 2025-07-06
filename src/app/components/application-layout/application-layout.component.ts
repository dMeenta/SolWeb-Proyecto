import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { NgClass } from '@angular/common';
import { MinimalUserInfo, SharedService } from '../../shared/shared.service';
import { BubbleChatContainerComponent } from '../bubble-chat-container/bubble-chat-container.component';
import { ScrollEventService } from '../../services/scroll-event.service';

@Component({
  selector: 'app-application-layout',
  imports: [
    HeaderComponent,
    RouterOutlet,
    AsideMenuComponent,
    NgClass,
    BubbleChatContainerComponent,
  ],
  templateUrl: './application-layout.component.html',
  styleUrl: './application-layout.component.css',
})
export class ApplicationLayoutComponent implements OnInit {
  userLogged!: MinimalUserInfo;
  private _sharedService = inject(SharedService);

  constructor(
    private router: Router,
    private scrollEventService: ScrollEventService
  ) {}

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

  onCustomScroll(event: Event) {
    const el = event.target as HTMLElement;
    const bottomReached =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20;

    if (bottomReached) {
      this.scrollEventService.emitScrollReachedBottom();
    }
  }
}
