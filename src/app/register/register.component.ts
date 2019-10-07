import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Auth from '@aws-amplify/auth';
import { SERVER_URL} from '../app.constants';
import { AuthService } from '../../app/auth/auth.service';
import { RegisterService } from './register.service';
import { User } from '../user';

@Component({
	selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    errorStatus = false;
    errorMessage = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private registerService: RegisterService
    ) {
       this.authService.logout();
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    loginSuccess() {
      if (this.authService.isLoggedIn()) {
         window.location.href = '/#home';
      } else {
        localStorage.removeItem( 'currentUser' );
        this.router.navigate(['/login']);
      }

    }

    login() {
      this.authService.login(this.f.username.value, this.f.password.value).then(data => {
             this.loginSuccess();
         }
           ).catch(err =>
              console.log(err)
      );
    }

    setErrorMessage(error) {
      this.errorStatus = true;
      this.errorMessage = error;
    }

    onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
      const registerUser = new User();
      registerUser.username = this.f.username.value;
      registerUser.email = this.f.username.value;
      registerUser.password = this.f.password.value;
      registerUser.firstName = this.f.firstName.value;
      registerUser.lastName = this.f.lastName.value;
      const firstName = this.f.firstName.value;
      const lastName = this.f.lastName.value;
      const username = this.f.username.value;
      const password = this.f.password.value;

      Auth.signUp({username, password,
      attributes: {
        family_name: lastName,
        given_name: firstName,
        phone_number: '+15555555555',
        email: username
      },
     })
     .then(data => {
       this.login()
     }).
       catch(err =>  {
        console.log('error');
        this.setErrorMessage(err.message);
       });

      this.loading = true;
    }
}
