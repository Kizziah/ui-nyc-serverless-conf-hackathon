import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import Auth from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient, ) { }

  registerUser(registerUser: User) {
 		return Auth.signIn('', '');
  }
}
