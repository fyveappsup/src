import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-myprofil',
  templateUrl: 'myprofil.html'
})
export class MyProfilPage {

  // Donnée de l'utilisateur
  id = '';
  nom = '';
  prenom = '';
  mail = '';
  mdp ='';
  description = '';
  serveur : boolean;

  isModifiable :boolean = false;


  constructor(public nav: NavController, public storage : Storage, public firebaseProvider: FirebaseProvider ) {
    this.storage.get("id").then((val) => {this.id=val;});
    this.storage.get("prenom").then((val) => {this.prenom=val;});
    this.storage.get("nom").then((val) => {this.nom= val;});
    this.storage.get("description").then((val) => {this.description=val;});
    this.storage.get("mdp").then((val) => {this.mdp=val;});
    this.storage.get("mail").then((val) => {this.mail=val;});
    this.storage.get("serveur").then((val) => {this.serveur=val;});
  }

  public modifier(){
   this.isModifiable=true;
  }

  public updateItem(){
    var value ={
      "prenom" : this.prenom,
      "nom" : this.nom,
      "description" : this.description,
      "mail" : this.mail,
      "mdp" : this.mdp,
      "serveur" : this.serveur
    };
    this.firebaseProvider.updateUserItem(this.id, value);
    this.storage.set("prenom", this.prenom);
    this.storage.set("nom", this.nom);
    this.storage.set("description", this.description);
    this.storage.set("mdp", this.mdp);
    this.storage.set("mail", this.mail);
    this.storage.set("serveur", this.serveur);

    this.isModifiable = false;

  }

  public deleteItem(){

  }

}