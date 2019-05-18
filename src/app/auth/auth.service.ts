import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs'
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { takeUntil } from 'rxjs/operators';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {

   private ngUnsubscribe$: Subject<void> = new Subject<void>();

   constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
      private uiService: UIService,
      private store: Store<fromRoot.State>,
      private trainingService: TrainingService
   ) { }

   initAuthListener() {
      this.afAuth.authState
         .pipe(takeUntil(this.ngUnsubscribe$))
         .subscribe(auth => {
            if (auth) {
               this.store.dispatch(new Auth.SetAuthenticated());
               this.trainingService.initTrainingHistory();
               this.router.navigate(['/training']);
            } else {
               this.store.dispatch(new Auth.SetUnauthenticated());
               this.trainingService.unSub();
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
      this.ngUnsubscribe$.complete();
      this.afAuth.auth.signOut();
   }
}
