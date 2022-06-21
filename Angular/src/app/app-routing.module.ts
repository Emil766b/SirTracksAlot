import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HistoryComponent } from './pages/history/history.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MapComponent } from './pages/map/map.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Redirect Unauthorized to login page
const redirectToLogin = () => redirectUnauthorizedTo(['']);
// Redirect authorized to map page
const redirectToMain = () => redirectLoggedInTo(['map'])

const routes: Routes = [
  {
    // Route to login page with path ''
    path: '',
    component: LoginComponent,
    ...canActivate(redirectToMain)
  },
  {
    // Route to map page with path 'map'
    path: 'map',
    pathMatch: 'full',
    component: MapComponent,
    ...canActivate(redirectToLogin)
  },
  {
    // Route to history page with path 'history'
    path: 'history',
    pathMatch: 'full',
    component: HistoryComponent,
    ...canActivate(redirectToLogin)
  },
  {
    // Route to signup page with path 'signup'
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToMain)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
