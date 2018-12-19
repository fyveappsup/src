import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-paiement',
  templateUrl: 'paiement.html'
})
export class PaiementPage {

  idDonneur = null;
  idServeur = null;
  montant : number  = 2;
  
  paiementEffectue = null;
  constructor(public nav: NavController, public navParams: NavParams, public firebaseProvider : FirebaseProvider, public storage: Storage) {
    this.storage.get("id").then((val) => {this.idDonneur=val;});
    this.idServeur = this.navParams.get('idServeur');
  }

  public payer(){
    this.paiementEffectue = this.firebaseProvider.addPaiementItem(this.idDonneur, this.idServeur, this.montant/100);
    
  }

}
