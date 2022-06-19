import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HistoryComponent } from './pages/history/history.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MapComponent } from './pages/map/map.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { Singup2Component } from './pages/singup2/singup2.component';

const redirectToLogin = () => redirectUnauthorizedTo(['']);
const redirectToMain = () => redirectLoggedInTo(['map'])

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    ...canActivate(redirectToMain)
  },
  {
    path: 'map',
    pathMatch: 'full',
    component: MapComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'history',
    pathMatch: 'full',
    component: HistoryComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToMain)
  },
  {
    path: 'signup2',
    component: Singup2Component,
    ...canActivate(redirectToLogin)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
