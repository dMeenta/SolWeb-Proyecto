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
import { Router } from '@angular/router';

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

  constructor(private readonly router: Router) {}

  onRadioChange(event: any): void {
    this.selectedImage = event.target.id;
  }

  isSelected(image: string): boolean {
    return this.selectedImage === image;
  }

  private formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);

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

  submit() {
    if (!this.signUpForm.valid) return;

    const { email, password, username, profilePicture, biography } =
      this.signUpForm.value;

    if (!email || !password || !username || !profilePicture) return;

    this._authService
      .signUp({
        email,
        username,
        password,
        biography,
        profilePicture,
      })
      .subscribe({
        next: (res) => {
          toast.success(res.message);
          this._authService.signIn({ email, password }).subscribe({
            next: () => {
              this.router.navigateByUrl('/');
            },
            error: (loginErr) => {
              toast.error(loginErr.error.message);
              this.router.navigateByUrl('/auth/sign-in');
            },
          });
        },
        error: (err) => {
          toast.error(err.error.message);
        },
      });
  }
}
