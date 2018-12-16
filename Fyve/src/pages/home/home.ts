import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController) {

  }

  

  viewRegisterPage() {
    this.nav.push(RegisterPage);
  }

  viewLoginPage() {
    this.nav.push(LoginPage);
  }
}
