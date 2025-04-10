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
import { HomeButtonComponent } from '../../../components/home-button/home-button.component';
import { NgClass } from '@angular/common';
import {
  User,
  UserCreate,
  UsersService,
} from '../../data-access/users.service';
import { Router } from '@angular/router';

interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

interface FormCreateUser {
  uid: FormControl<string | null>;
  email: FormControl<string | null>;
  username: FormControl<string | null>;
  profile_url: FormControl<string | null>;
}

@Component({
    selector: 'app-sign-up',
    imports: [ReactiveFormsModule, HomeButtonComponent, NgClass],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css'
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
  private _userService = inject(UsersService);
  next: boolean = false;
  profileUrls = [
    'profile_isagi',
    'profile_bachira',
    'profile_nagi',
    'profile_chigiri',
  ];

  isRequired(field: 'email' | 'password' | 'username' | 'profile_url') {
    return isRequired(field, this.form);
  }

  passwordLong() {
    return passwordLong(this.form);
  }

  isEmailRequired() {
    return hasEmailError(this.form);
  }

  form = this.formBuilder.group<FormSignUp>({
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  form_2 = this.formBuilder.group<FormCreateUser>({
    uid: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.required]),
    username: this.formBuilder.control('', [Validators.required]),
    profile_url: this.formBuilder.control('', [Validators.required]),
  });

  redirectToLogin() {
    this.router.navigateByUrl('/sign-in');
  }

  async submit() {
    if (this.next == false) {
      if (!this.form.valid) return;
      try {
        const { email, password } = this.form.value;

        if (!email || !password) return;

        await this._authService.signUp({ email, password }).then((item) => {
          this.form_2.controls.uid.setValue(item);
        });

        this.form_2.controls.email.setValue(email);
        this.next = true;
        await this._authService.signIn({ email, password });
      } catch (error) {
        toast.error('Hubo un error al crear el usuario. Intentelo nuevamente.');
      }
    } else {
      if (!this.form_2.valid) return;

      try {
        const { uid, email, profile_url, username } = this.form_2.value;

        if (!uid || !email || !profile_url || !username) return;

        const user: UserCreate = {
          email: email,
          profile_url: profile_url,
          username: username,
        };
        await this._userService.createUser(uid, user);
        toast.success('Usuario creado correctamente');
        this.next = false;
        this.router.navigateByUrl('/');
        Router;
      } catch (error) {
        toast.error('Algo salió mal :( \nIntentalo nuevamente');
      }
    }
  }
}
