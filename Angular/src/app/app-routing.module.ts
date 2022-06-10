import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToMain = () => redirectLoggedInTo(['landing'])

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToMain)
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToMain)
  },
  {
    path: 'landing',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
