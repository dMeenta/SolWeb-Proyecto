import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SocialService } from '../../services/social.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-button',
  imports: [],
  templateUrl: './user-button.component.html',
  styleUrl: './user-button.component.css',
})
export class UserButtonComponent {
  @Input() username!: string;
  @Input() userProfilePicture!: string;

  constructor(private router: Router, private socialService: SocialService) {}

  goToUserProfile() {
    this.router.navigateByUrl(`/profile/${this.username}`);
  }
  agregarAmigo(event: Event) {
    event.stopPropagation(); // evita que se dispare verPerfil()
    // lógica para enviar solicitud de amistad

    this.socialService.sendFriendRequest(this.username).subscribe((item) => {
      if (!item.success) {
        console.error(item);
        toast.error(`${item.message}`);
      }
      toast.success(`${item.data}`);
    });
  }
}
