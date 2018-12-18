import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-serveurprofil',
  templateUrl: 'serveurprofil.html'
})
export class ServeurProfilPage {

  // profil serveur
  profil = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profil = this.navParams.get('profil');
    this.profil = JSON.parse(this.profil);
  }

}
