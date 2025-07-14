import { Component, Input, OnInit, signal } from '@angular/core';
import { UserCommunityDTO } from '../user-communities-bubbles/user-communities-bubbles.component';
import { getSplitDateTime } from '../../shared/ui/functions/formatDate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-card',
  imports: [],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.css',
})
export class CommunityCardComponent implements OnInit {
  @Input({ required: true }) userCommunity!: UserCommunityDTO;
  date = signal<string>('');
  time = signal<string>('');

  constructor(private readonly router: Router) {}
  ngOnInit(): void {
    const { date, time } = getSplitDateTime(this.userCommunity.memberSince);
    this.date.set(date);
    this.time.set(time);
  }

  goToCommunity() {
    this.router.navigateByUrl(`community/${this.userCommunity.name}`);
  }
}
