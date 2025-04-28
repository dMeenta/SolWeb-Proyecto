import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../auth/data-access/users.service';
import { ActivatedRoute } from '@angular/router';
import { UserMSQL } from '../../models/UserMSQL';
import ApiResponse from '../../models/ApiResponse';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
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
