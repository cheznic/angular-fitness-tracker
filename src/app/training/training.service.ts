import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { TrainingHistoryLoaded } from './training.actions';
import { UnSub } from '../shared/unsub';

@Injectable()
export class TrainingService {

   private subs = new UnSub();

   constructor(
      private db: AngularFirestore,
      private uiService: UIService,
      private store: Store<fromRoot.State>
   ) { }

   exercisesList$: Observable<Exercise[]> = this.db
      .collection<Exercise>('availableExercises')
      .snapshotChanges()
      .pipe(
         map(docs => {
            return docs.map(doc => {
               return {
                  ...doc.payload.doc.data(),
                  id: doc.payload.doc.id,
               };
            });
         }),
         catchError((err, caught) => {
            console.log(err);
            this.uiService.showError('Fetching exercises failed, please try again later');
            return caught;
         })
      );

   // With the DB pushing changes, there is no 
   // need to request history data, just set up 
   // the response to updates and update the store 
   // reactively.
   initTrainingHistory() {
      this.subs.add(this.db
         .collection<Exercise>('exerciseHistory')
         .snapshotChanges()
         .pipe(
            map(docs => {
               return docs.map(doc => {
                  return {
                     ...doc.payload.doc.data(),
                     id: doc.payload.doc.id,
                  };
               });
            }),
            catchError((err, caught) => {
               console.log(err);
               this.uiService.showError('Fetching training history failed, please try again later');
               return caught;
            })
         ).subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new TrainingHistoryLoaded(exercises));
         })
      );
   }

   unSub() {
      this.subs.unsub();
   }
}
