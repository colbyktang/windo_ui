import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(environment.API_URL);
    window.sessionStorage.setItem(environment.API_URL, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(environment.API_URL);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(environment.API_URL);
    if (user) {
      return true;
    }

    return false;
  }
}
