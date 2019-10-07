import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Auth from '@aws-amplify/auth';
import { AuthService } from '../../app/auth/auth.service';
import { AuthGuardService } from '../../app/auth/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthGuardService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorStatus = false;
  errorMessage = '';

  constructor(
  	private formBuilder: FormBuilder,
	  private route: ActivatedRoute,
	  private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
	  this.loginForm = this.formBuilder.group({
	   	username: ['', Validators.required],
	    password: ['', Validators.required]
	  });
  }

  get f() { return this.loginForm.controls; }


  loginSuccess() {
    if (this.authService.isLoggedIn()) { 
      this.router.navigate(['/home']).then(nav => {        
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });      
    } else {
      localStorage.removeItem( 'currentUser' );
      this.router.navigate(['/login']);
    }

  }

  setErrorMessage(error) {
    this.errorStatus = true;
    this.errorMessage = error;
  }

  onSubmit() {
   this.submitted = true;

   if (this.loginForm.invalid) {
    return;
   }
   this.authService.login(this.f.username.value, this.f.password.value)
    .then(
     response=>
      {
        
       if (response.accessToken) {
         this.loginSuccess();
       } else {
         this.setErrorMessage(response);
       }
   });

   this.loading = true;

  }

}
