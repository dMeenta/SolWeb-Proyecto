import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { CommentaryComponent } from '../commentary/commentary.component';
import {
  Post,
  PostDTO,
} from '../../routing/community-page/community-page.component';
import { PostsService } from '../../services/posts.service';
import { toast } from 'ngx-sonner';
import { CommentaryContainerComponent } from '../commentary-container/commentary-container.component';
import {
  CommentaryDTO,
  CommentsService,
} from '../../services/comments.service';
import { newCommentSignal } from '../../shared/ui/signals/newComment.signal';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [NgClass, NgIf, CommentaryContainerComponent, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input({ required: true }) post!: PostDTO;
  commentContent = signal('');
  liked = signal(false);
  hovering = signal(false);

  constructor(
    private postService: PostsService,
    private commentService: CommentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.liked.set(this.post.currentUserLikedIt);
  }

  createCommentary() {
    const contentToComment = this.commentContent(); // Obtienes el valor de la Signal

    if (!contentToComment.trim()) {
      toast.error('Comment content cannot be null or empty');
      return;
    }
    this.commentService
      .create(this.post.id, contentToComment)
      .subscribe((res) => {
        if (!res.success) {
          console.error(res);
          toast.error(res.message);
        }
        toast.success(res.message);

        const commentDTO: CommentaryDTO = {
          id: res.data.id,
          postId: res.data.postId,
          commentContent: res.data.commentContent,
          currentUserLikedIt: false,
          likes: res.data.likes,
          commentedAt: res.data.commentedAt,
          commenterProfilePicture: res.data.commenterProfilePicture,
          commenterUsername: res.data.commenterUsername,
        };

        newCommentSignal.set(commentDTO);
        this.commentContent.set('');
      });
  }

  toggleLike(): void {
    this.postService.toggleLike(this.post.id).subscribe((res) => {
      if (!res.success) {
        console.error(res);
        toast.error(res.message);
      }
      this.liked.update((prev) => {
        this.post.likes = res.data.likes;
        return !prev;
      });
    });
  }

  goToCommunityPage() {
    this.router.navigateByUrl(`/community/${this.post.communityName}`);
  }
  goToUserProfile() {
    this.router.navigateByUrl(`/profile/${this.post.posterUsername}`);
  }
}
