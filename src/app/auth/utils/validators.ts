import { Form, FormGroup } from '@angular/forms';

export function isRequired(
  field: 'email' | 'password' | 'username' | 'profile_url',
  form: FormGroup
) {
  let control = form.get(field);
  return control && control.touched && control.hasError('required');
}

export function hasEmailError(form: FormGroup) {
  let control = form.get('email');
  return control && control?.touched && control.hasError('email');
}

export function passwordLong(form: FormGroup) {
  let control = form.get('password');
  return control && control?.touched && control.hasError('minlength');
}
