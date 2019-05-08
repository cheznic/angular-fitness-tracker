import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Exercise } from './exercise.model';

@Injectable()
export class TrainingHistoryService {

   trainingHistory$: Observable<Exercise[]>;

   constructor(
      private db: AngularFirestore,
   ) { 
      this.trainingHistory$ = this.db
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
      );
   }

   addToTrainingHistory(exercise: Exercise) {
      this.db.collection('exerciseHistory').add(exercise);
   }
}