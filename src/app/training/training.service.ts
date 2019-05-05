import { Exercise } from './exercise.model';
import { BehaviorSubject, Subject } from 'rxjs';

export class TrainingService {

   private runningExercise: Exercise;
   private exercisesLog: Exercise[] = [];
   private subject: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>(availableExercises.slice());

   exercises$ = this.subject.asObservable();
   selectedExercise = new Subject<Exercise>();

   select(exerciseId: string) {
      this.runningExercise = availableExercises.find(ex => ex.id === exerciseId);
      this.selectedExercise.next({ ...this.runningExercise });
   }

   complete() {
      this.exercisesLog.push({
         ...this.runningExercise,
         date: new Date(),
         state: "completed"
      });
      this.runningExercise = null;
      this.selectedExercise.next(null);
   }

   cancel(progress: number) {
      this.exercisesLog.push({
         ...this.runningExercise,
         duration: this.runningExercise.duration * (progress / 100),
         calories: this.runningExercise.calories * (progress / 100),
         date: new Date(),
         state: "canceled"
      });
      this.runningExercise = null;
      this.selectedExercise.next(null);
   }

   getExerciseLog() {
      return this.exercisesLog.slice();
   }

   getRunningExercise(): Exercise {
      return { ...this.runningExercise };
   }
}


const availableExercises: Exercise[] = [
   { id: 'crunches', name: 'Crunches', duration: 120, calories: 10 },
   { id: 'burpies', name: 'Burpies', duration: 90, calories: 15 },
   { id: 'plank', name: 'Plank', duration: 80, calories: 8 },
   { id: 'sidePlank', name: 'Side Plank', duration: 30, calories: 6 },
   { id: 'dumbellCurl', name: 'Dumbell Curl', duration: 40, calories: 8 },
   { id: 'dumbellMilitaryPress', name: 'Dumbell Military Press', duration: 40, calories: 8 },
];

