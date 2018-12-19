import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html'
})
export class HistoriquePage {

  listPaiement = null;
  lesPaiements = [];

  idUser = null;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public storage: Storage) {
  }

  ionViewWillEnter(){
    this.storage.get("id").then((val) => {
      this.idUser=val;
      console.log("idUser", this.idUser);
      this.listPaiement = this.firebaseProvider.getPaiementById(this.idUser);
      console.log(this.listPaiement);
      this.listPaiement.forEach(element => {
        console.log(element);
        this.lesPaiements=this.lesPaiements.concat(element);
      });
      console.log(this.lesPaiements);
    });
  }

}
