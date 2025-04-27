import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import {
  hasEmailError,
  isRequired,
  passwordLong,
} from '../../utils/validators';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import ApiResponse from '../../../models/ApiResponse';
import { UserMSQL } from '../../../models/UserMSQL';
import { UsersService } from '../../data-access/users.service';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
})
export default class SignInComponent {
  constructor(private router: Router) {}
  private formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _userService = inject(UsersService);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  passwordLong() {
    return passwordLong(this.form);
  }

  isEmailRequired() {
    return hasEmailError(this.form);
  }

  form = this.formBuilder.group<FormSignIn>({
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async submit() {
    if (!this.form.valid) return;

    const { email, password } = this.form.value;

    if (!email || !password) return;

    try {
      const authResponse: ApiResponse<any> = await firstValueFrom(
        this._authService.signIn({ email, password })
      );

      if (!authResponse.success) {
        toast.error('Credenciales invalidas.');
      }

      const userResponse: ApiResponse<any> = await firstValueFrom(
        this._userService.getProfile(authResponse.data.localId)
      );

      const creationDate = new Date(userResponse.data.creationDate);
      const formattedDate = creationDate.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const userLogged: UserMSQL = {
        uid: userResponse.data.uid,
        email: userResponse.data.email,
        username: userResponse.data.username,
        profilePicture: userResponse.data.profilePicture,
        biography: userResponse.data.biography,
        creationDate: formattedDate,
        role: userResponse.data.role,
      };

      console.log(userLogged);

      toast.success(`Inicio de sesión exitoso.`);

      localStorage.setItem('userLogged', JSON.stringify(userLogged));

      this.router.navigateByUrl('/');
    } catch (error) {
      toast.error('Hubo un error al iniciar sesión. Intentelo nuevamente.');
      console.error(error);
    }
  }

  redirectToRegister() {
    this.router.navigateByUrl('/auth/sign-up');
  }
}
