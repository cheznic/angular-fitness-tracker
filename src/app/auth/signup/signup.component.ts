import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate: Date;
  signupForm: FormGroup;
  spinner$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  private initSpinner() {
    // set 'is loading' state to the spinner$ observable
    this.spinner$ = this.store.select(fromRoot.getIsLoading);
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.signupForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      birthdate: new FormControl('', { validators: [Validators.required, Validators.max(this.maxDate.valueOf())] }),
      agree: new FormControl('', { validators: [Validators.required, Validators.requiredTrue] })
    });

    this.initSpinner();
  }

  onSubmit() {
    this.authService.registerUser({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    });
  }
}
