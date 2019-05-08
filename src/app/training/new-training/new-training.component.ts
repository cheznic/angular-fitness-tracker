import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises$: Observable<Exercise[]>;

  constructor(
    public trainingService: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
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

  onStartTraining(form: NgForm) {
    this.trainingService.selectExercise(form.value.exerciseId);
  }
}
