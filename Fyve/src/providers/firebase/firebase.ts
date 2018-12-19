import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
 
@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpClient, public afd:AngularFireDatabase, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    console.log('Constructeur firebase provider');
  }

  // UserItem **********************************************
  getUserItems() {
    return this.afd.list('/UserItems/');
  }

  getUser(key:string){
    return this.afd.list('/UserItems/'+key);
  }

  getUserByValue(cle:string, value:string){
    return this.afd.list('/UserItems', {
      query: {
        orderByChild: cle,
        equalTo : value
      }
    });
  }

  addItem(prenom : string, nom: string, mail: string, description: string, serveur : boolean, mdp: string) {
    var data= {
      "prenom" : prenom,
      "nom" : nom,
      "mail" : mail,
      "description" : description,
      "serveur" : serveur,
      "mdp" : mdp
    };
    return this.afd.list('/UserItems/').push(data).key;
  }

  updateUserItem(id, value){
    this.afd.list('/UserItems/').update(id, value)
      .then(_ => this.creerToast("Vos informations ont été mises à jour !"))
      .catch(err => this.creerAlert("Une erreur est survenue", err.toString(), "OK"));
  }
 
  removeUserItem(id) {
    this.afd.list('/UserItems/').remove(id)
    .then(_ => this.creerToast("Votre compte a bien été supprimé."))
    .catch(err => this.creerAlert("Une erreur est survenue", err.toString(), "OK"));
  }

  // **********************************************************************************

  // PaiementItem
  addPaiementItem(idDonneur : string, idReceveur: string, montant : number) {
    var data= {
      "idDonneur" : idDonneur,
      "idReceveur" : idReceveur,
      "montant" : montant,
      "date" : Date.now()
    };
    return this.afd.list('/PaiementItems/').push(data).key;
  }

  getPaiementById(value:string){
    return this.afd.list('/PaiementItems', {
      query: {
        orderByChild: "date",
        equalTo : value
      }
    });
  }


  // **********************************************************************************
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

