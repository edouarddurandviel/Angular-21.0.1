import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, Field, required, email } from '@angular/forms/signals';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type Roles = {
  id: number;
  name: string;
};

interface LoginData {
  email: string;
  password: string;
  roleId: string;
}

@Component({
  selector: 'app-login',
  imports: [Field],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  // forms with signal strategy
  /////////////////////////////
  router = inject(Router);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
    roleId: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  rolesData: Array<Roles> = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
  ];

  onSubmit(event: Event) {
    event.preventDefault();

    const credentials = this.loginModel();

    // e.g. await this.authService.login(credentials);
    this.#setSessionToken(credentials, { token: 'qsdfd546464qsdf4df' });
    this.router.navigate(['/']);
  }

  #setSessionToken(subscription: any, token: any) {
    localStorage.setItem('session', JSON.stringify(subscription));
    sessionStorage.setItem('session', JSON.stringify(token));
  }
}
