import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'home', component: MainComponent, title: `${environment.title}` },
    { path: 'login', component: LoginComponent, title: `${environment.title} - Login` },
    { path: 'dashboard', component: DashboardComponent, title: `${environment.title} - Dashboard`},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', pathMatch: 'full', component: PagenotfoundComponent, title: `${environment.title} Error`}
];
