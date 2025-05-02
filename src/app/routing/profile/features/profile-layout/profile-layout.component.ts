import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../../../auth/data-access/users.service';
import ApiResponse from '../../../../models/ApiResponse';
import { UserMSQL } from '../../../../models/UserMSQL';

@Component({
  selector: 'app-profile-layout',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.css',
})
export class ProfileLayoutComponent implements OnInit {
  private _userData = inject(UsersService);
  currentUserData!: UserMSQL;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('id');
    if (uid) this.getUser(uid);
  }

  async getUser(uid: string) {
    try {
      const response: ApiResponse<any> = await firstValueFrom(
        this._userData.getProfile(uid)
      );

      if (!response.success) {
        console.error('Error al obtener el perfil:', response.message);
      }

      this.currentUserData = response.data;
    } catch (error) {
      console.error('Error de red o del servidor:', error);
    }
  }
}
