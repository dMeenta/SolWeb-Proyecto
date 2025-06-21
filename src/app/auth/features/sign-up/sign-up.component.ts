import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  hasEmailError,
  isRequired,
  passwordLong,
} from '../../utils/validators';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { UsersService } from '../../data-access/users.service';
import { Router } from '@angular/router';
import { UserMSQL } from '../../../models/UserMSQL';
import ApiResponse from '../../../models/ApiResponse';
import { firstValueFrom } from 'rxjs';

interface SignUpForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  username: FormControl<string | null>;
  profilePicture: FormControl<string | null>;
  biography: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export default class SignUpComponent {
  selectedImage: string = '';

  onRadioChange(event: any): void {
    this.selectedImage = event.target.id;
  }

  isSelected(image: string): boolean {
    return this.selectedImage === image;
  }

  constructor(private router: Router) {}

  private formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  next: boolean = false;
  profileUrls = [
    'profile_isagi',
    'profile_bachira',
    'profile_nagi',
    'profile_chigiri',
  ];

  isRequired(field: 'email' | 'password' | 'username' | 'profilePicture') {
    return isRequired(field, this.signUpForm);
  }

  passwordLong() {
    return passwordLong(this.signUpForm);
  }

  isEmailRequired() {
    return hasEmailError(this.signUpForm);
  }

  redirectToLogin() {
    this.router.navigateByUrl('/auth/sign-in');
  }

  goToNextPage() {
    this.next = true;
  }

  goToPreviousPage() {
    this.next = false;
  }

  canGoNext(): boolean {
    const email = this.signUpForm.get('email');
    const password = this.signUpForm.get('password');

    if (!email || !password) return false;
    return email.valid && password.valid;
  }

  signUpForm = this.formBuilder.group<SignUpForm>({
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    username: this.formBuilder.control('', [Validators.required]),
    profilePicture: this.formBuilder.control('', [Validators.required]),
    biography: this.formBuilder.control(''),
  });

  async submit() {
    if (!this.signUpForm.valid) return;

    const { email, password, username, profilePicture, biography } =
      this.signUpForm.value;

    if (!email || !password || !username || !profilePicture) return;

    try {
      const response: ApiResponse<any> = await firstValueFrom(
        this._authService.signUp({
          email,
          username,
          password,
          biography,
          profilePicture,
        })
      );

      if (!response.success) {
        toast.error('Error al registrar el usuario en LoudlyGmz');
        console.error('Error Data: ' + response.data);
        console.error('Error Message: ' + response.message);
      }

      this.router.navigateByUrl('/auth/sign-in');
      toast.success('Usuario creado correctamente');
    } catch (error) {
      toast.error(`Hubo un error al crear el usuario. Inténtalo nuevamente.`);
      console.error('Error de tipo: ', error);
    }
  }
}
