import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html'
})
export class HistoriquePage {

  section = "recus";

  listPaiementDonnes = null;
  lesPaiementsDonnes = [];
  totalDonnes = 0;

  listPaiementRecus = null;
  lesPaiementsRecus = [];
  totalRecus = 0;

  idUser = null;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public storage: Storage) {
  }

  ionViewWillEnter(){
    this.storage.get("id").then((val) => {
      this.idUser=val;
      console.log("idUser", this.idUser);

      // paiemments recus
      this.listPaiementRecus = this.firebaseProvider.getPaiementRecusById(this.idUser);
      this.listPaiementRecus.forEach(element => {
        this.lesPaiementsRecus=[];
        this.lesPaiementsRecus=element;
        this.getTotalRecus();
      });
      console.log("paiement recus",this.lesPaiementsRecus);

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

  public getNomUser(id:string) : string{
    var nom ="";
    this.firebaseProvider.getUserById(id).forEach(user =>{
      nom = user.prenom + " "+ user.nom;
    });
    return nom;
  }

  public getTotalRecus(){
    this.totalRecus=0;
    this.lesPaiementsRecus.forEach(item =>{
      console.log("item", item);
      this.totalRecus+=item.montant;
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
