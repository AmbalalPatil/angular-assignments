import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  submitMessage: string;
  username = new FormControl('');
  password = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  userRole = new FormControl('');

  registerSubmit() {
    if(this.username.value == '' || this.password.value == '' || this.firstName.value == '' 
      || this.lastName.value == '' || this.userRole.value == '') {
      this.submitMessage = 'Please enter mandatory fields';
    } else {
      const loginData = `{"userId": "${this.username.value}", "userPassword": "${this.password.value}", "firstName": "${this.firstName.value}"
        , "lastName": "${this.lastName.value}", "userRole": "${this.userRole.value}"}`;
      this.authService.registerUser(JSON.parse(loginData)).subscribe(
        data => {
          localStorage.setItem('regStatus', 'success');
          this.routerService.routeToLogin();
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
}
