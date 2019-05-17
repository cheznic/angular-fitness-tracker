import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable, Subscriber } from 'rxjs';
import { take, map, tap, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';

import { StopTrainingComponent } from './stop-training.component';
import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import {
  SaveCanceledExercise,
  SaveCompletedExercise
} from '../training.actions';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  private frequency: number;
  private timerSub: Subscription;
  private started: boolean = false;
  private exerciseSub: Subscription;

  progress = 0;
  progressText = '0';
  timerButtonText = "Start"
  cancelButtonText = "Cancel"
  exerciseName: string = "";
  exercise: Exercise;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.exerciseSub = this.store
      .select(fromRoot.getActiveExercise)
      .pipe(filter(exercise => !!exercise))
      .subscribe(exercise => {
        this.exercise = exercise;
        this.initTimer();
      });
  }

  ngOnDestroy() {
    this.cancelTimer();
    if (!!this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }

  onCancel() {
    this.pauseTimer();
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.store.dispatch(new SaveCanceledExercise(this.exercise));
      }
    });
  }

  onButtonClick() {
    // do Start
    if (!this.started && this.progress === 0) {
      this.startTimer();
      this.timerButtonText = "Pause";
      return;
    }

    // do Pause
    if (this.started) {
      this.pauseTimer();
      this.timerButtonText = "Resume";
      return;
    }

    // do Restart
    if (Math.ceil(this.progress) > 99) {
      this.initTimer();
      this.timerButtonText = "Pause";
      this.cancelButtonText = "Cancel"
      return;
    }

    // do Resume
    if (!this.started && this.progress > 0 && this.progress < 100) {
      this.startTimer();
      this.timerButtonText = "Pause";
      return;
    }
  }

  private pauseTimer() {
    this.started = false;
    this.cancelTimer();
  }

  private startTimer() {
    this.started = true;
    this.timerSub = interval(this.frequency).pipe(
      take(100 - this.progress)
    ).subscribe(x => {
      this.progress++;
      this.progressText = Math.ceil(this.progress).toString();
      if (Math.ceil(this.progress) > 99) {
        this.timerButtonText = "Restart";
        this.cancelButtonText = "Exit";
        // save the completed exercise
        this.store.dispatch(
          new SaveCompletedExercise({
            exercise: this.exercise,
            progress: this.progress
          })
        );
        this.started = false;
      }
    });
  }

  private cancelTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = undefined;
    }
  }

  private initTimer() {
    this.cancelTimer();
    this.frequency = this.exercise.duration * 10; // (1000 / 100 = 10)
    this.progress = 0;
    this.progressText = '0';
    this.started = false;
    this.timerButtonText = "Start";
  }
}
