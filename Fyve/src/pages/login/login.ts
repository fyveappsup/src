import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user :any;

  mail ='';
  mdp='';

  verification = false;

  constructor(public nav: NavController, public firebaseProvider: FirebaseProvider, public alertCtrl: AlertController, public toastCtrl: ToastController, public storage: Storage) {

  }

  public login() {
    // Vérification si tous les champs sont inscrits
    if (this.mail && this.mdp) {
 
      // Récupéractions des infos de l'utilisateur pour les sauvegarder dans la mémoire
      this.user = this.firebaseProvider.getUserByValue("mail", this.mail);
      this.user.forEach(item => {
        if(item.length==0){
          this.creerToast("Ce mail n'existe pas dans notre base");
        }
        item.forEach(element => {
          console.log(element);
          this.user = element;
          if(element.mdp == this.mdp){
            this.verification=true;
            this.creerToast("Login correct !");
            if(this.verification==true){
              this.storage.set("id", element.$key );
              this.storage.set("description", this.user.description);
              this.storage.set("mail", this.user.mail);
              this.storage.set("mdp", this.user.mdp);
              this.storage.set("nom", this.user.nom);
              this.storage.set("prenom", this.user.prenom);
              this.storage.set("serveur", this.user.serveur);
              this.nav.setRoot(MenuPage);
            }
            else{
              this.creerToast("Login incorrect !")
            }
          }
        });
      });
    }
    // Quand tous les champs ne sont pas remplie
    else {
      this.creerAlert('Un oubli est vite arrivé !','Veuillez remplir tous les champs !', 'Je réessaye')
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
