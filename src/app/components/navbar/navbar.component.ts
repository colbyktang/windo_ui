import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import User from '../../models/User';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor (private storageService : StorageService, private authService : AuthService) {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.storageService.getUser().data.user;
    }
  }

  isLoggedIn : boolean; 
  user : User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    role: ''
  };

  logout () {
    console.log ("Logged out");
    this.authService.logout();
    this.storageService.clean();
    this.isLoggedIn = this.storageService.isLoggedIn();
  }
}
