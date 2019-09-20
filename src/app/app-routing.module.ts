import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './services/login.guard';

import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [LoginGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'principal' },
  { path: '**', component: PageNotFoundComponent, data: { titulo: 'Error 404' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
