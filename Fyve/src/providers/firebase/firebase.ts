import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
 
@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpClient, public afd:AngularFireDatabase) {
    console.log('Constructeur firebase provider');
  }

  getUserItems() {
    return this.afd.list('/UserItems/');
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
    this.afd.list('/UserItems/').push(data);
  }
 
  removeItem(id) {
    this.afd.list('/UserItems/').remove(id);
  }
}

