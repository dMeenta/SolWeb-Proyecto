import { NgClass } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import {
  CommentaryDTO,
  CommentsService,
} from '../../services/comments.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commentary',
  imports: [NgClass],
  templateUrl: './commentary.component.html',
  styleUrl: './commentary.component.css',
})
export class CommentaryComponent implements OnInit {
  @Input({ required: true }) comment!: CommentaryDTO;
  liked = signal(false);
  hovering = signal(false);

  constructor(
    private commentService: CommentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.liked.set(this.comment.currentUserLikedIt);
  }

  toggleLike(): void {
    this.commentService.toggleLike(this.comment.id).subscribe((res) => {
      if (!res.success) {
        console.error(res);
        toast.error(res.message);
      }
      this.liked.update((prev) => {
        this.comment.likes = res.data.likes;
        return !prev;
      });
    });
  }

  goToUserProfile() {
    this.router.navigateByUrl(`/profile/${this.comment.commenterUsername}`);
  }
}
