import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  private selectedExercise: Exercise;
  private frequency: number;
  private timerSub: Subscription;
  private started: boolean = false;
  private completed: boolean = false;

  progress = 0;
  progressText = '0';
  timerButtonText = "Start"
  cancelButtonText = "Cancel"
  exerciseName: string = "";

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.selectedExercise = this.trainingService.getCurrentExercise();
    this.exerciseName = this.selectedExercise.name;
    this.initTimer();
  }

  ngOnDestroy() {
    this.cancelTimer();
  }

  onCancel() {
    if (this.completed) {
      this.trainingService.completeExercise();
    } else {
      this.pauseTimer();
      const dialogRef = this.dialog.open(StopTrainingComponent, {
        data: {
          progress: this.progress
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.trainingService.cancelExercise(this.progress);
        }
      });
    }
  }

  onButtonClick() {
    // do Start
    if (!this.started && this.progress === 0) {
      this.startTimer();
      return;
    }

    // do Pause
    if (this.started) {
      this.pauseTimer();
      return;
    }

    // do Reset
    if (Math.ceil(this.progress) > 99) {
      this.initTimer();
      this.completed = false;
      this.cancelButtonText = "Cancel"
      return;
    }

    // do Resume
    if (!this.started && this.progress > 0 && this.progress < 100) {
      this.startTimer();
      return;
    }
  }

  private pauseTimer() {
    this.started = false;
    this.timerButtonText = "Resume";
    this.cancelTimer();
  }

  private startTimer() {
    this.started = true;
    this.timerButtonText = "Pause";
    this.timerSub = interval(this.frequency).pipe(
      take(100 - this.progress)
    ).subscribe(x => {
      this.progress++;
      this.progressText = Math.ceil(this.progress).toString();
      if (Math.ceil(this.progress) > 99) {
        this.timerButtonText = "Reset";
        this.cancelButtonText = "Exit";
        this.trainingService.completeExercise();
        this.completed = true;
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
    const milliseconds = this.selectedExercise.duration * 1000;
    this.frequency = milliseconds / 100;
    this.progress = 0;
    this.progressText = '0';
    this.started = false;
    this.timerButtonText = "Start";
  }
}
