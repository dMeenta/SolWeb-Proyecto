import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { PostDTO } from '../../routing/community-page/community-page.component';
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
import { PostLikesPanelComponent } from '../post-likes-panel/post-likes-panel.component';
import { getDateOnly } from '../../shared/ui/functions/formatDate';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';
import {
  ModalContent,
  modalContentSignal,
} from '../../shared/ui/signals/showModal.signal';
import { EditPostContentPanelComponent } from '../edit-post-content-panel/edit-post-content-panel.component';

@Component({
  selector: 'app-post',
  imports: [
    NgClass,
    NgIf,
    CommentaryContainerComponent,
    FormsModule,
    PostLikesPanelComponent,
    LoaderSpinnerComponent,
    ModalLayoutComponent,
    EditPostContentPanelComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Output() postDeleted = new EventEmitter<string>();
  @Input({ required: true }) post!: PostDTO;
  commentContent = signal('');
  liked = signal(false);
  hovering = signal(false);
  postedDate = signal<string>('');
  deletingIsLoading = signal(false);
  openingEditPanelIsLoading = signal(false);
  postContent = signal('');

  readonly modalContentSignal: Signal<ModalContent> = computed(() =>
    modalContentSignal()
  );

  constructor(
    private postService: PostsService,
    private commentService: CommentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.liked.set(this.post.currentUserLikedIt);
    const date = getDateOnly(this.post.postedAt);
    this.postedDate.set(date);
    this.postContent.set(this.post.content);
  }

  deletePost() {
    this.deletingIsLoading.set(true);
    this.postService.deletePostById(this.post.id).subscribe({
      next: (res) => {
        toast.success(res.message);
        this.deletingIsLoading.set(false);
        this.postDeleted.emit(this.post.id);
      },
      error: (err) => {
        toast.error(err.error.message);
        console.error(err);
        this.deletingIsLoading.set(false);
      },
    });
  }

  showLikesList() {
    modalContentSignal.set({ type: 'likes', postId: this.post.id });
  }

  openEditPanel() {
    modalContentSignal.set({
      type: 'edit',
      postInfo: {
        postId: this.post.id,
        content: this.postContent(),
        contentSignal: this.postContent,
      },
    });
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
