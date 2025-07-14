import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { CommunityService } from '../../../../services/community.service';
import { toast } from 'ngx-sonner';
import { UserCommunityDTO } from '../../../../components/user-communities-bubbles/user-communities-bubbles.component';
import { LoaderSpinnerComponent } from '../../../../components/loader-spinner/loader-spinner.component';
import { CommunityCardComponent } from '../../../../components/community-card/community-card.component';

@Component({
  selector: 'app-communities',
  imports: [
    NgForOf,
    CommonModule,
    LoaderSpinnerComponent,
    CommunityCardComponent,
  ],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.css',
})
export class CommunitiesComponent implements OnInit {
  private allCommunities = signal<UserCommunityDTO[]>([]);
  private offset = signal(0);
  private limit = 10;
  private loading = signal(false);
  private noMore = signal(false);

  readonly communities: Signal<UserCommunityDTO[]> = computed(() =>
    this.allCommunities()
  );
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  constructor(
    private readonly router: Router,
    private readonly communityService: CommunityService
  ) {}

  ngOnInit(): void {
    this.getUserCommunities();
  }

  getUserCommunities() {
    if (this.loading() || this.noMore()) return;
    this.loading.set(true);

    this.communityService
      .getCommunitiesByUser(this.offset(), this.limit)
      .subscribe({
        next: (res) => {
          const page = res.data;
          const current = this.allCommunities();
          this.allCommunities.set([...current, ...page.content]);
          this.offset.set(this.offset() + this.limit);
          if (page.content.length < this.limit) {
            this.noMore.set(true);
          }

          this.loading.set(false);
        },
        error: (err) => {
          toast.error(err.error.message);
          this.loading.set(false);
        },
      });
  }
}
