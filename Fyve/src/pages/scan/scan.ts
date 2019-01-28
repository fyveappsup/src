import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { ServeurProfilPage } from '../serveurprofil/serveurprofil';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {

  serveur:any = null;
  constructor(public nav: NavController, public alertCtrl: AlertController, public scanQr: BarcodeScanner) {
    
  }

  ionViewWillEnter(){
   this.scan();
  }

  public scan() {
    this.scanQr.scan().then(barcodeData => {
      this.serveur=barcodeData.text;
      if(this.serveur){
         this.nav.push(ServeurProfilPage, {
          "profil": this.serveur
        }); 
      }
      else{
        this.nav.pop();
      }
      
    }, (err) => {
        this.createAlert("Erreur", "Une erreur s'est produite.", err, "OK");
        console.log('Error: ', err);
    });
  }

  public allerProfilServeur(){
    var qrData={
      "id" : "-LUKySJjGB9nKZIV2qsS",
      "prenom" : "Francois",
      "nom" : "Le Francais",
      "description" : "Supporter de l'equipe de France",
      "mail" : "francois@france.fr"
    };
    var serv=JSON.stringify(qrData);
    this.nav.push(ServeurProfilPage, {
      "profil": serv
    }); 
  }


  public createAlert(title:string, subtitle:string, message:string, button:string){

    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      message : message,
      buttons: [button]
    });
    alert.present();
  }

}
