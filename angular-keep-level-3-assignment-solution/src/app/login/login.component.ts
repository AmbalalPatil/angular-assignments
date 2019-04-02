import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  submitMessage: string;
  username = new FormControl('');
  password = new FormControl('');

  loginSubmit() {
    if(this.username.value == '' || this.password.value == ''){
      this.submitMessage = 'Please enter username and password';
    } else {
      const loginData = `{"userId": "${this.username.value}", "userPassword": "${this.password.value}"}`;
      this.authService.authenticateUser(JSON.parse(loginData)).subscribe(
        data => {
          this.authService.setBearerToken(data['token']);
          this.authService.setUserId(this.username.value);
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
  }

  constructor(private authService: AuthenticationService,
    private routerService: RouterService) { }

  ngOnInit(){
    const regStatus = localStorage.getItem('regStatus');
    if(regStatus == 'success'){
      this.submitMessage = 'User Registration is successful';
      localStorage.removeItem('regStatus');
    }
  }
}
