import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';
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
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  // forms with signal strategy
  /////////////////////////////
  router = inject(Router);

  selectedOption$ = signal<string>('');

  loginModel = signal<LoginData>({
    email: '',
    password: '',
    roleId: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
    required(schemaPath.roleId, { message: 'Role is required' });
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

  roleChanged(event: Event) {
    const role = event.target as HTMLSelectElement;
    const optionText = role.options[role.selectedIndex].text;
    if (role.selectedIndex > 0) {
      this.selectedOption$.set(optionText);
    } else {
      this.selectedOption$.set('');
    }

    if (role) return;
  }

  #setSessionToken(subscription: any, token: any) {
    localStorage.setItem('session', JSON.stringify(subscription));
    sessionStorage.setItem('session', JSON.stringify(token));
  }
}
