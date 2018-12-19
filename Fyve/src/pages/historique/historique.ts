import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html'
})
export class HistoriquePage {

  listPaiement = null;

  idUser = null;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public storage: Storage) {
    this.storage.get("id").then((val) => {this.idUser=val;});
  }

  ionViewWillEnter(){
   this.listPaiement = this.firebaseProvider.getPaiementById(this.idUser);
  }

}
