import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './login/logout.component';
import { RegisterComponent } from './register/register.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  {
  	path: 'login',
  	component: LoginComponent
  },
  { path: 'register',
    component: RegisterComponent
  },
  { path: 'logout',
    component: LogoutComponent
  },
  { path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
	providers: [AuthGuardService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
