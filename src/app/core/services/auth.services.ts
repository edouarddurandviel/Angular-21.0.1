import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectedUser } from '../guards/auth-guard.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // constructor(private http: HttpClient) {}

  private isAuthenticated: boolean = false;
  private STORAGE_KEY: string = 'session';

  public async isLoggedIn() {
    const user: any = await this.getStorageItem('session');

    if (user && user.token) {
      return user;
    } else {
      return null;
    }
  }

  public async login(email: string, password: string) {
    // demo purpose
    // must check server
    const myPassword: string = 'mypassword';
    const myEmail: string = 'test@test.com';
    const name: string = 'Edouard Durand-Viel';
    const token = 'fdfqdf54654654qsdfqsdf';

    if (myPassword === password && myEmail === email) {
      const user: ConnectedUser = {
        userId: 1,
        name: name,
        token: token,
      };

      this.setUserSession(user);
      return user;
    }
    return null;
  }

  public async logout() {
    this.deleteStorageItem('session')
  }

   private getStorageItem(key: string) {
    const storedUser = localStorage.getItem(key);
    const savedToken = sessionStorage.getItem(key);

    if (savedToken && storedUser) {
      const storedU = JSON.parse(storedUser);
      const savedT = JSON.parse(savedToken);
      return {
        token: savedT,
        email: storedU.email,
        userId: storedU.userId,
        name: storedU.name,
      };
    }
    return null;
  }

  private setStorageItem(key: string, value: ConnectedUser): void {
    localStorage.setItem(key, JSON.stringify(value));
    sessionStorage.setItem(key, JSON.stringify(value.token));
  }

  private deleteStorageItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  private setUserSession(user: ConnectedUser): void {
    if (user.token) {
      this.setStorageItem(this.STORAGE_KEY, user);
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

 
}
