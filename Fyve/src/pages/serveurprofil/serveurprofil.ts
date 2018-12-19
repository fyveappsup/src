import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyProfilPage } from '../myprofil/myprofil';
import { PaiementPage } from '../paiement/paiement';

@Component({
  selector: 'page-serveurprofil',
  templateUrl: 'serveurprofil.html'
})
export class ServeurProfilPage {

  // profil serveur
  profil = null;
  constructor(public nav: NavController, public navParams: NavParams) {
    this.profil = this.navParams.get('profil');
    this.profil = JSON.parse(this.profil);
  }

  public paiement() {
  
      this.nav.push(PaiementPage, {
      "idServeur": this.profil.id 
    }); 
}
}

