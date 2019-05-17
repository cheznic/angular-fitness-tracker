import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {

   constructor(
      private db: AngularFirestore,
      private uiService: UIService
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

   exerciseHistory$: Observable<Exercise[]> = this.db
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
      );
}

