import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { modalContentSignal } from '../../shared/ui/signals/showModal.signal';
import { toast } from 'ngx-sonner';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-post-content-panel',
  imports: [FormsModule, LoaderSpinnerComponent, NgIf],
  templateUrl: './edit-post-content-panel.component.html',
  styleUrl: './edit-post-content-panel.component.css',
})
export class EditPostContentPanelComponent implements OnInit {
  newPostContent = signal('');
  initialContent!: string;
  postId!: string;
  isLoading = signal(false);
  externalPostContentSignal?: WritableSignal<string>;

  constructor(private readonly postService: PostsService) {}

  ngOnInit(): void {
    const modal = modalContentSignal();
    if (modal?.type !== 'edit') return;

    const { postId, content, contentSignal } = modal.postInfo;
    if (!postId || !content) return;

    this.postId = postId;
    this.initialContent = content;
    this.newPostContent.set(content);

    this.externalPostContentSignal = contentSignal;
  }

  submit() {
    this.isLoading.set(true);
    this.postService
      .editPostContent(this.postId, this.newPostContent())
      .subscribe({
        next: (res) => {
          toast.success(res.message);
          if (this.externalPostContentSignal) {
            this.externalPostContentSignal.set(this.newPostContent());
          }
          modalContentSignal.set(null);
          this.isLoading.set(false);
        },
        error: (err) => {
          toast.error(err.error.message);
          this.isLoading.set(false);
        },
      });
  }
}
