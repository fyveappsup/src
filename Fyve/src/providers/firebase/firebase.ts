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
 
  removeItem(id) {
    this.afd.list('/UserItems/').remove(id);
  }
}

