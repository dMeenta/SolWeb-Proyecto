import { Component, Input } from '@angular/core';
import { HomeButtonComponent } from '../../home-button/home-button.component';
import { UserMSQL } from '../../../models/UserMSQL';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  imports: [HomeButtonComponent, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() userLogged!: UserMSQL;

  logout(uid: string) {
    console.log(this.userLogged);
  }
}
