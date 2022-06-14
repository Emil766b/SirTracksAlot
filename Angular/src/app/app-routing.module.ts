import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HistoryComponent } from './pages/history/history.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MapComponent } from './pages/map/map.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToMain = () => redirectLoggedInTo(['map'])

const routes: Routes = [
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
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToMain)
  },
  {
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
