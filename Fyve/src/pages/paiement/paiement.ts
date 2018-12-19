import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-paiement',
  templateUrl: 'paiement.html'
})
export class PaiementPage {

  idServeur = null;
  constructor(public nav: NavController, public navParams: NavParams) {

    this.idServeur = this.navParams.get('idServeur');
  }

}
