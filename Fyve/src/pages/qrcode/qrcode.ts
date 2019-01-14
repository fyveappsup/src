import { ServeurProfilPage } from './../serveurprofil/serveurprofil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html'
})
export class QrCodePage {

  qrData=null;
  id=null;
  prenom=null;
  nom=null;
  description=null;
  mail=null;


  constructor(public navCtrl: NavController, public storage: Storage) {
   
  }

  ionViewWillEnter(){
    this.storage.get("id").then((val) => {this.id=val;});
    this.storage.get("prenom").then((val) => {this.prenom=val;});
    this.storage.get("nom").then((val) => {this.nom= val;});
    this.storage.get("description").then((val) => {this.description=val;});
    this.storage.get("mail").then((val) => {this.mail=val;});
  }

  ionViewDidEnter(){
    if(this.id && this.description && this.mail && this.nom && this.prenom){
      this.qrData={
        "id" : this.id,
        "prenom" : this.prenom,
        "nom" : this.nom,
        "description" : this.description,
        "mail" : this.mail
      };
      this.qrData=JSON.stringify(this.qrData);
    }
  }

  viewMyServeurProfil(){
    var qrData={
      "id" : this.id,
      "prenom" : this.prenom,
      "nom" : this.nom,
      "description" : this.description,
      "mail" : this.mail
    };
    var serv=JSON.stringify(qrData);
    this.navCtrl.push(ServeurProfilPage, {
      "profil": serv
    }); 
  }

}
