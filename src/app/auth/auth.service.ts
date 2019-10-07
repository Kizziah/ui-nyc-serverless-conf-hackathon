import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER_URL} from '../app.constants';
import { map } from 'rxjs/operators';
import { User } from '../user';
import Auth from '@aws-amplify/auth';
// import { AmplifyService }  from 'aws-amplify-angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
   @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  redirectUrl: string;
  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;


  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>( JSON.parse( localStorage.getItem( 'currentUser' ) ) );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  static isUserLoggedIn(): boolean {
    return localStorage.getItem( 'isLoggedIn' ) === 'true';
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem( 'currentUser' ));

  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return false;
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem( 'isLoggedIn' ) === 'true';
  }

  setToken(user) {

    if (user && user.idToken) {
      this.getLoggedInName.emit(user.idToken.payload.email);
      // store user details and Cogn token in local storage to keep user logged in between page refreshes
      localStorage.setItem( 'currentUser', JSON.stringify( user.idToken.payload ) );
      localStorage.setItem( 'isLoggedIn', 'true' );
      this.currentUserSubject.next( user );
    }
    return user;
  }

  // @ts-ignore
  login(username: string, password: string){
     return Auth.signIn(username, password).then(data =>
         Auth.currentSession()).then(data => {
            return this.setToken(data)
         })
         .catch(err => {
           return err.message;
         }
          )
       .catch(err => {
         return err.message;
       }
        );
  }

  logout() {
    localStorage.removeItem( 'currentUser' );
    this.currentUserSubject.next( null );
    localStorage.setItem( 'isLoggedIn', 'false' );
  }
}
