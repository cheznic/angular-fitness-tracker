import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
   declarations: [
      SignupComponent,
      LoginComponent,
   ],
   imports: [
      SharedModule,
      ReactiveFormsModule,
      AngularFireAuthModule,
      AuthRoutingModule
   ],
   exports: [
      AuthRoutingModule
   ]
})
export class AuthModule { }
