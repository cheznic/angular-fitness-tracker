import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import * as fromRoot from '../app.reducer'
import {
   TrainingActions,
   RequestExerciseList,
   ExerciseListLoaded,
   RequestTrainingHistory,
   TrainingHistoryLoaded,
   SaveCompletedExercise,
   SaveCanceledExercise,
   SaveExerciseSuccess
} from './training.actions';
import { Exercise } from './exercise.model';
import * as UI from '../shared/ui.actions';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingEffects {

   @Effect()
   getExercises$ = this.actions$.pipe(
      ofType<RequestExerciseList>(TrainingActions.RequestExerciseList),
      tap(() => {
         console.log(`EFFECT: ${TrainingActions.RequestExerciseList}`);
         this.store.dispatch(new UI.StartLoading());
      }),
      switchMap(() => {
         try {
            return this.db
               .collection<Exercise>('availableExercises')
               .snapshotChanges()
               .pipe(
                  map(docs => {
                     return docs.map(doc => {
                        return {
                           id: doc.payload.doc.id,
                           ...doc.payload.doc.data()
                        };
                     });
                  }),
                  tap(() => {
                     this.store.dispatch(new UI.StopLoading());
                  })
               )
         }
         catch (err) {
            console.log(err);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showError('Fetching exercises failed, please try again later');
         }
      }),
      switchMap((exercises: Exercise[]) => {
         return of(new ExerciseListLoaded(exercises));
      })
   );

   @Effect()
   getTrainingHistory$ = this.actions$.pipe(
      ofType<RequestTrainingHistory>(TrainingActions.RequestTrainingHistory),
      tap(() =>
         console.log(`EFFECT: ${TrainingActions.RequestTrainingHistory}`)
      ),
      switchMap(() => {
         try {
            return this.db
               .collection<Exercise>('exerciseHistory')
               .snapshotChanges()
               .pipe(
                  map(docs => {
                     return docs.map(doc => {
                        return {
                           id: doc.payload.doc.id,
                           ...doc.payload.doc.data()
                        };
                     });
                  })
               )
         }
         catch (err) {
            console.log(err);
            this.uiService.showError('Fetching training history failed, please try again later');
         }
      }),
      switchMap((exercises: Exercise[]) => {
         return of(new TrainingHistoryLoaded(exercises));
      }),
   );

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
         // console.log('SaveCanceledExercise: before update', action.payload);
         let x = {
            ...action.payload,
            state: 'canceled',
            duration: 0,
            calories: 0,
            date: new Date()
         }
         // console.log('SaveCanceledExercise: after update', x);
         return this.db.collection('exerciseHistory').add(x);
      }),
      catchError((err, caught) => {
         console.log(err);
         this.uiService.showError('Saving to training history failed, please try again later');
         return caught;
      })
   );

   constructor(
      private store: Store<fromRoot.State>,
      private db: AngularFirestore,
      private actions$: Actions,
      private uiService: UIService
   ) { }
}