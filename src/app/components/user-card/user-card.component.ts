import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-card',
    imports: [],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: any;

  constructor(private router: Router) {}
  goToProfile() {
    this.router.navigateByUrl(`/profile/${this.user.id}`);
  }
}
