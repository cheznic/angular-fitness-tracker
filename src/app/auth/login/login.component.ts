import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  spinner$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    // public uiService: UIService,
    public store: Store<fromRoot.State>
  ) { }

  private initSpinner() {
    // set 'is loading' state to the spinner$ observable
    this.spinner$ = this.store.select(fromRoot.getIsLoading)
 }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
    });
    this.initSpinner();
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
