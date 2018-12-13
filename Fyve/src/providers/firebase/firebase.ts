import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
 
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpClient, public afd:AngularFireDatabase) {
    console.log('Constructeur firebase provider');
  }

  getUserItems() {
    return this.afd.list('/UserItems/');
  }
 
  addItem(name) {
    this.afd.list('/UserItems/').push(name);
  }
 
  removeItem(id) {
    this.afd.list('/UserItems/').remove(id);
  }
}

