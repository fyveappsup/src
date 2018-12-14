import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user: any;

  nom = '';
  prenom = '';
  mail = '';
  description = '';
  serveur :boolean = false;
  mdp  = '';

  cle = "";

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }


  addItem() {
    if(this.nom && this.prenom && this.mail && this.mail && this.description && this.mdp){
      this.cle = this.firebaseProvider.addItem(this.prenom, this.nom, this.mail, this.description,this.serveur, this.mdp);
      
      var toast;
      if(this.cle!=""){
        toast = this.toastCtrl.create({
          message: 'Votre compte a été créé.',
          duration: 3000
        });
        toast.present();
        
        this.user = this.firebaseProvider.getUser(this.cle);
        this.user.forEach(item =>{
          item.forEach(element => {
            console.log("key: " + element.$key + ", value : "+element.$value);
          });
        });
      }
      else{
        toast = this.toastCtrl.create({
          message: 'Une erreur est survenue avec la bdd.',
          duration: 3000
        });
        toast.present();
      }

    }
    else{

      const alert = this.alertCtrl.create({
        title: 'Un oubli est vite arrivé !',
        subTitle: 'Veuillez remplir tous les champs !',
        buttons: ['Je réessaye']
      });
      alert.present();

    }
  }
} 
