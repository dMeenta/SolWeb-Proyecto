import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute } from '@angular/router';
import { Location, NgForOf } from '@angular/common';
import { Game } from '../../models/Game';
import { toast } from 'ngx-sonner';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { PostComponent } from '../../components/post/post.component';

export interface Post {
  id: string;
  communityName: string;
  posterUsername: String;
  posterProfilePicture: string;
  likes: string[];
  content: string;
  postedAt: number;
}

export interface PostDTO {
  id: string;
  communityName: string;
  posterUsername: String;
  posterProfilePicture: string;
  likes: string[];
  content: string;
  currentUserLikedIt: boolean;
  isOwner: boolean;
  postedAt: number;
}

@Component({
  selector: 'app-community-page',
  imports: [FormsModule, PostComponent, NgForOf],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.css',
})
export class CommunityPageComponent implements OnInit {
  postContent = signal('');
  private allPosts = signal<PostDTO[]>([]);
  private offset = signal(0);
  private limit = 8;
  private loading = signal(false);
  private noMore = signal(false);

  readonly posts: Signal<PostDTO[]> = computed(() => this.allPosts());
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  gameName!: string;
  game!: Game;

  constructor(
    private _gameService: GamesService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameName = params['name'];
      this.getGame(this.gameName);
      this.loadCommunityPosts(this.gameName);
    });
  }

  loadCommunityPosts(gameName: string) {
    if (this.loading() || this.noMore()) return;

    this.loading.set(true);

    this.postsService
      .findByCommunityName(gameName, this.offset(), this.limit)
      .subscribe((res) => {
        if (!res.success) {
          toast.error(res.message);
          this.loading.set(false);
          return;
        }

        const page = res.data;
        const current = this.allPosts();
        this.allPosts.set([...current, ...page.content]);

        this.offset.set(this.offset() + this.limit);

        if (page.content.length < this.limit) {
          this.noMore.set(true);
        }
        this.loading.set(false);
      });
  }

  create() {
    const contentToPost = this.postContent(); // Obtienes el valor de la Signal

    if (!contentToPost.trim()) {
      toast.error('El contenido del post no puede estar vacío.');
      return;
    }
    this.postsService.create(this.game.name, contentToPost).subscribe((res) => {
      if (!res.success) {
        toast.error(res.message);
      }
      toast.success(res.message);

      const postDTO: PostDTO = {
        id: res.data.id,
        communityName: res.data.communityName,
        content: res.data.content,
        currentUserLikedIt: false,
        likes: res.data.likes,
        isOwner: true,
        postedAt: res.data.postedAt,
        posterProfilePicture: res.data.posterProfilePicture,
        posterUsername: res.data.posterUsername,
      };

      this.allPosts.update((prev) => [postDTO, ...prev]);
      this.postContent.set('');
    });
  }

  goBack() {
    this.location.back();
  }

  async getGame(gameName: string) {
    if (!gameName) return;

    this._gameService.getGameByName(gameName).subscribe((res) => {
      if (!res.success) {
        console.error(res);
      }
      this.game = res.data;
    });
  }

  removePost(postId: string) {
    this.allPosts.update((posts) => posts.filter((p) => p.id !== postId));
  }
}
