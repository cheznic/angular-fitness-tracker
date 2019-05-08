import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining: boolean = false;
  subscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.ongoingTraining = false;
    this.subscription = this.trainingService.currentExercise$.subscribe(exercise => {
      this.ongoingTraining = !!exercise;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
