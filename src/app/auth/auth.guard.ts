import { Injectable } from '@angular/core';
import {
   CanActivate,
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   Router,
   CanLoad,
   Route
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

   constructor(
      private authService: AuthService,
      private router: Router
   ) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.check();
   }

   canLoad(route: Route): boolean {
      return this.check();
   }

   private check(): boolean {
      if (this.authService.isAuth()) {
         return true;
      } else {
         this.router.navigate(['/login']);
      }
   }
}