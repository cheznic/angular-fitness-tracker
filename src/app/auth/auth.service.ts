import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthService {

   private sub: Subscription;

   constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
      private uiService: UIService,
      private store: Store<fromRoot.State>
   ) { }

   initAuthListener() {
      this.sub = this.afAuth.authState.subscribe(user => {
         if (user) {
            this.store.dispatch(new Auth.SetAuthenticated());
            this.router.navigate(['/training']);
         } else {
            this.store.dispatch(new Auth.SetUnauthenticated());
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
      // this.sub.unsubscribe();
      this.afAuth.auth.signOut();
   }
}
