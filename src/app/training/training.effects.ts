import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import {
   TrainingActions,
   SaveCompletedExercise,
   SaveCanceledExercise,
   SaveExerciseSuccess
} from './training.actions';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingEffects {

   @Effect()
   saveCompletedExercise$ = this.actions$.pipe(
      ofType<SaveCompletedExercise>(TrainingActions.SaveCompletedExercise),
      tap(() =>
         console.log(`EFFECT: ${TrainingActions.SaveCompletedExercise}`)
      ),
      switchMap(action => {
         return this.db.collection('exerciseHistory').add({
            ...action.payload.exercise,
            state: 'completed',
            duration: action.payload.exercise.duration * (action.payload.progress / 100),
            calories: action.payload.exercise.calories * (action.payload.progress / 100),
            date: new Date()
         });
      }),
      switchMap(action => {
         return of(new SaveExerciseSuccess());
      }),
      catchError((err, caught) => {
         console.log(err);
         this.uiService.showError('Saving to training history failed, please try again later');
         return caught;
      })
   );

   @Effect()
   saveCanceledExercise$ = this.actions$.pipe(
      ofType<SaveCanceledExercise>(TrainingActions.SaveCanceledExercise),
      tap(() =>
         console.log(`EFFECT: ${TrainingActions.SaveCanceledExercise}`)
      ),
      switchMap(action => {
         console.log('SaveCanceledExercise: before update', action.payload);
         let x = {
            ...action.payload,
            state: 'canceled',
            duration: 0,
            calories: 0,
            date: new Date()
         }
         console.log('SaveCanceledExercise: after update', x);
         this.db.collection('exerciseHistory').add(x);
         return of(new SaveExerciseSuccess());
      }),
      catchError((err, caught) => {
         console.log(err);
         this.uiService.showError('Saving to training history failed, please try again later');
         return caught;
      })
   );

   constructor(
      private db: AngularFirestore,
      private actions$: Actions,
      private uiService: UIService,
   ) { }
}