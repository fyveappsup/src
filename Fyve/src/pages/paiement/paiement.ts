import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';


@Component({
  selector: 'page-paiement',
  templateUrl: 'paiement.html'
})
export class PaiementPage {

  idDonneur = null;
  Serveur = null;
  montant : number  = 2;
  
  paiementEffectue = null;
  constructor(public nav: NavController, public navParams: NavParams, public firebaseProvider : FirebaseProvider, public storage: Storage, public alertCtrl: AlertController, public toastCtrl: ToastController, public nativeAudio: NativeAudio) {
    this.storage.get("id").then((val) => {this.idDonneur=val;});
    this.Serveur = this.navParams.get('Serveur');
  }


  

  public payer(){
    this.paiementEffectue = this.firebaseProvider.addPaiementItem(this.idDonneur, this.Serveur.id, this.montant/10);
    if(this.paiementEffectue!=null){
      this.creerToast("Le serveur vous remercie !");
      this.nav.pop();
    }
    else{
      this.creerAlert("Une erreur est survenue !", "Une erreur est survenue avec la base de données", "Ok");
    }
  }

  // Création d'un toast
  public creerToast(message: string) {
    var toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  // Création d'une alerte
  public creerAlert(titre:string, soustitre:string, boutton:string){
    const alert = this.alertCtrl.create({
      title: titre,
      subTitle: soustitre,
      buttons: [boutton]
    });
    alert.present();
  }
}
