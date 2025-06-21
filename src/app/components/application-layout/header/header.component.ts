import { Component, Input } from '@angular/core';
import { HomeButtonComponent } from '../../home-button/home-button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MinimalUserInfo } from '../../../shared/shared.service';

@Component({
  selector: 'app-header',
  imports: [HomeButtonComponent, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() userLogged!: MinimalUserInfo;

  logout(uid: string) {
    console.log(this.userLogged);
  }
}
