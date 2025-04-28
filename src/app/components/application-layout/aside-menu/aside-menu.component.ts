import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-aside-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.css',
})
export class AsideMenuComponent {
  @Input() uid!: string;
  @Input() username!: string;
  @Input() profilePicture!: string;
  @Input() role?: string;
}
