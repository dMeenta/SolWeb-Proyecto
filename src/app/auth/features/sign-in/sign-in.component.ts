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
import { HomeButtonComponent } from '../../../components/home-button/home-button.component';
import { Router } from '@angular/router';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
    selector: 'app-sign-in',
    imports: [ReactiveFormsModule, HomeButtonComponent],
    templateUrl: './sign-in.component.html'
})
export default class SignInComponent {
  constructor(private router: Router) {}
  private formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

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
    try {
      const { email, password } = this.form.value;

      if (!email || !password) return;

      await this._authService.signIn({ email, password }).then(() => {
        this.router.navigateByUrl('/');
        toast.success(`Inicio de sesión correcto.`);
      });
    } catch (error) {
      toast.error('Hubo un error al iniciar sesión. Intentelo nuevamente.');
    }
  }

  redirectToRegister() {
    this.router.navigateByUrl('/auth/sign-up');
  }
}
