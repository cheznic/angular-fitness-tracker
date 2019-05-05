import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth$: Observable<boolean>;

  @Output()
  sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.authService.authChange$;
  }

  onClickMenuToggle() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

}
