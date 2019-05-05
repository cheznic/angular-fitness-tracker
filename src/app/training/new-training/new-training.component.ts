import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises$: Observable<Exercise[]> = this.trainingService.exercises$;

  constructor(
    public trainingService: TrainingService
  ) { }

  ngOnInit() {
  }

  onStartTraining(form: NgForm) {
    this.trainingService.select(form.value.exerciseId);
  }
}
