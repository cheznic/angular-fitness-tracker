import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// import { AngularFirestore } from '@angular/fire/firestore';
// import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {

   // private currentExercise: Exercise;
   // private exerciseList: Exercise[] = [];

   // private selectedExercise = new Subject<Exercise>();
   // currentExercise$ = this.selectedExercise.asObservable();

   constructor(
      // private db: AngularFirestore
   ) { }

   // selectExercise(exerciseId: string) {
   //    this.currentExercise = this.exerciseList.find(ex => ex.id === exerciseId);
   //    this.selectedExercise.next({ ...this.currentExercise });
   // }

   // completeExercise() {
   //    this.addToTrainingHistory(this.currentExercise);
   //    this.currentExercise = null;
   //    this.selectedExercise.next(null);
   // }

   // cancelExercise(progress: number) {
   //    this.addToTrainingHistory(this.currentExercise);
   //    this.currentExercise = null;
   //    this.selectedExercise.next(null);
   // }

   // addToTrainingHistory(exercise: Exercise) {
   //    this.db.collection('exerciseHistory').add({ ...exercise });
   // }

   // getCurrentExercise(): Exercise {
   //    return { ...this.currentExercise };
   // }
}

