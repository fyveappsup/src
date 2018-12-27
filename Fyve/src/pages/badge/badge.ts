import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-badge',
  templateUrl: 'badge.html'
})
export class BadgePage {

  section = "sommes";

  listPaiementDonnes = null;
  lesPaiementsDonnes = [];
  totalDonnes = 0;

  idUser = null;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public storage: Storage) {
    
  }

  ionViewWillEnter(){
    this.storage.get("id").then((val) => {
      this.idUser=val;
      console.log("idUser", this.idUser);

      // paiemments données
      this.listPaiementDonnes = this.firebaseProvider.getPaiementDonnesById(this.idUser);
      this.listPaiementDonnes.forEach(element => {
        this.lesPaiementsDonnes=[];
        this.lesPaiementsDonnes=element;
        this.getTotalDonnes();
      });
      console.log("paiement donnes",this.lesPaiementsDonnes);

    });
  }

  public getTotalDonnes(){
    this.totalDonnes=0;
    this.lesPaiementsDonnes.forEach(item =>{
      console.log("item", item);
      this.totalDonnes+=item.montant;
    });
  }

}
