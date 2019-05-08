import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
   private subject = new Subject<boolean>();
   private isAuthenticated = false;

   authenticated$ = this.subject.asObservable()

   constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
      private uiService: UIService,
      private store: Store<fromRoot.State>
   ) { }

   initAuthListener() {
      this.afAuth.authState.subscribe(user => {
         if (user) {
            this.subject.next(true);
            this.isAuthenticated = true;
            this.router.navigate(['/training']);
         } else {
            this.subject.next(false);
            this.isAuthenticated = false;
            this.router.navigate(['/login']);
         }
      });
   }

   registerUser(authData: AuthData) {
      this.store.dispatch(new UI.StartLoading());
      this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
         .then(result => {
            this.store.dispatch(new UI.StopLoading());
         })
         .catch(err => {
            console.log(err);
            this.uiService.showError(err);
            this.store.dispatch(new UI.StopLoading());
         });
   }

   login(authData: AuthData) {
      this.store.dispatch(new UI.StartLoading());
      this.afAuth.auth
         .signInWithEmailAndPassword(authData.email, authData.password)
         .then(result => {
            this.store.dispatch(new UI.StopLoading());
         })
         .catch(err => {
            console.log(err);
            this.uiService.showError(err);
            this.store.dispatch(new UI.StopLoading());
         });
   }

   logout() {
      this.afAuth.auth.signOut();
   }

   isAuth() {
      return this.isAuthenticated;
   }
}
