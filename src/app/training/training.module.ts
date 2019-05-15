import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TrainingComponent } from '../training/training.component';
import { CurrentTrainingComponent } from '../training/current-training/current-training.component';
import { NewTrainingComponent } from '../training/new-training/new-training.component';
import { PastTrainingsComponent } from '../training/past-trainings/past-trainings.component';
import { StopTrainingComponent } from '../training/current-training/stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
   declarations: [
      TrainingComponent,
      CurrentTrainingComponent,
      NewTrainingComponent,
      PastTrainingsComponent,
      StopTrainingComponent
   ],
   imports: [
      SharedModule,
      TrainingRoutingModule
   ],
   exports: [
      TrainingRoutingModule
   ],
   entryComponents: [
      StopTrainingComponent
   ]
})
export class TrainingModule { }
