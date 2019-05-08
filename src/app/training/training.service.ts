import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Exercise } from './exercise.model';
import { TrainingHistoryService } from './training-history.service';

@Injectable()
export class TrainingService {

   private currentExercise: Exercise;
   private exerciseList: Exercise[] = [];

   exercises$: Observable<Exercise[]>;
   exercisesHistory$: Observable<Exercise[]>;
   private selectedExercise = new Subject<Exercise>();
   currentExercise$ = this.selectedExercise.asObservable();

   constructor(
      private db: AngularFirestore,
      private trainingHistoryService: TrainingHistoryService
   ) {
      this.fetchAvailableExercises();
      this.populateExerciseList();
   }

   selectExercise(exerciseId: string) {
      this.currentExercise = this.exerciseList.find(ex => ex.id === exerciseId);
      this.selectedExercise.next({ ...this.currentExercise });
   }

   fetchAvailableExercises() {
      this.exercises$ = this.db
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
            })
         );

   }

   completeExercise() {
      this.trainingHistoryService.addToTrainingHistory({
         ...this.currentExercise,
         date: new Date(),
         state: "completed"
      });
      this.currentExercise = null;
      this.selectedExercise.next(null);
   }

   cancelExercise(progress: number) {
      this.trainingHistoryService.addToTrainingHistory({
         ...this.currentExercise,
         duration: this.currentExercise.duration * (progress / 100),
         calories: this.currentExercise.calories * (progress / 100),
         date: new Date(),
         state: "canceled"
      });
      this.currentExercise = null;
      this.selectedExercise.next(null);
   }

   private populateExerciseList() {
      this.exercises$.subscribe((exercises: Exercise[]) => {
         this.exerciseList = exercises;
      });
   }

   getCurrentExercise(): Exercise {
      return { ...this.currentExercise };
   }
}

