import { Component, animate } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { ServeurProfilPage } from '../serveurprofil/serveurprofil';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {

  serveur:any =null;
  constructor(public nav: NavController, public alertCtrl: AlertController, public scanQr: BarcodeScanner) {
    
  }

  public scan() {
    this.scanQr.scan().then(barcodeData => {
      this.serveur=barcodeData.text;
      // this.serveur = JSON.parse(this.serveur);
      this.nav.push(ServeurProfilPage, {
      "profil": this.serveur
    }); 
    }, (err) => {
        this.createAlert("Erreur", "Une erreur s'est produite.", err, "OK");
        console.log('Error: ', err);
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
