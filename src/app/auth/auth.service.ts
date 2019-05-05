import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
   private subject = new Subject<boolean>();
   authChange$ = this.subject.asObservable()

   private user: User;

   constructor(private router: Router) { }

   registerUser(authData: AuthData) {
      this.user = {
         email: authData.email,
         userId: Math.round(Math.random() * 10000000).toString()
      };
      this.authSuccess();
   }

   login(authData: AuthData) {
      this.user = {
         email: authData.email,
         userId: Math.round(Math.random() * 10000000).toString()
      }
      this.authSuccess();
   }

   logout() {
      this.user = null;
      this.subject.next(false);
      this.router.navigate(['/login']);
   }

   getUser() {
      return { ...this.user };
   }

   isAuth() {
      return this.user != null;
   }

   private authSuccess() {
      this.subject.next(true);
      this.router.navigate(['/training']);
   }
}
