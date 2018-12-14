import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  nom = '';
  prenom = '';
  mail = '';
  description = '';
  serveur :boolean = false;
  mdp  = '';

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
  }
  addItem() {
    this.firebaseProvider.addItem(this.prenom, this.nom, this.mail, this.description,this.serveur, this.mdp);
  }
} 
