import { Component, computed, inject, Signal, signal } from '@angular/core';
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
import { LoaderSpinnerComponent } from '../../../components/loader-spinner/loader-spinner.component';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, NgIf, LoaderSpinnerComponent],
  templateUrl: './sign-in.component.html',
})
export default class SignInComponent {
  private loading = signal(false);
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

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

  submit() {
    if (!this.form.valid) return;
    this.loading.set(true);

    const { email, password } = this.form.value;

    if (!email || !password) return;

    this.authService.signIn({ email, password }).subscribe({
      next: (res) => {
        this.loading.set(false);
        toast.success(res.message);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        toast.error(err.error.message);
        this.loading.set(false);
      },
    });
  }

  redirectToRegister() {
    this.router.navigateByUrl('/auth/sign-up');
  }
}
