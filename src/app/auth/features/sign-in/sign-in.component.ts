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
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  private readonly formBuilder = inject(FormBuilder);

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
        this.authService.signIn({ email, password })
      );

      if (!authResponse.success) {
        toast.error('Credenciales invalidas.');
      }

      toast.success(`Inicio de sesión exitoso.`);

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
