import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitMessage: string;
  username = new FormControl('');
  password = new FormControl('');

  loginSubmit() {
    const loginData = `{"username": "${this.username.value}", "password": "${this.password.value}"}`;
    this.authService.authenticateUser(JSON.parse(loginData)).subscribe(
      data => {
        this.authService.setBearerToken(data['token']);
        this.routerService.routeToDashboard();
      },
      error => {
        if (typeof error.error === 'undefined') {
          this.submitMessage = error.message;
        } else {
          this.submitMessage = error.error.message;
        }
      }
    );
  }

  constructor(private authService: AuthenticationService,
    private routerService: RouterService) { }
}
