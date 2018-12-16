import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  //variable qui recupère les info de l'utilisateur lorsqu'il est inscrit
  user: any;

  // variables du formulaire
  nom = '';
  prenom = '';
  mail = '';
  description = '';
  serveur: boolean = false;
  mdp = '';

  // variable qui recupère la clé primaire lors de l'inscription
  cle = "";

  constructor(public nav: NavController, public firebaseProvider: FirebaseProvider, public alertCtrl: AlertController, public toastCtrl: ToastController, public storage: Storage) {

  }


  public addItem() {
    // Vérification si tous les champs sont inscrits
    if (this.nom && this.prenom && this.mail && this.description && this.mdp) {
      // Verification si le mail est déjà present dans la bdd
      var mailExiste = this.firebaseProvider.getUserByValue("mail", this.mail);
      console.log(mailExiste);
      mailExiste.forEach(item => {
        console.log('testmail',item);
        var nb = item.length;
        if(nb==0){
          // le mail existe pas, on peut enregistrer
          // Envoie des données à la bdd
          this.cle = this.firebaseProvider.addItem(this.prenom, this.nom, this.mail, this.description, this.serveur, this.mdp);

          // Si ca a marché 
          if(this.cle!=""){
            this.creerToast("Votre compte a été créer !");

            // Récupéractions des infos de l'utilisateur pour les sauvegarder dans la mémoire
            this.user = this.firebaseProvider.getUser(this.cle);
            this.user.forEach(item => {
              item.forEach(element => {
                this.storage.set(element.$key, element.$value);
              });
            });
            this.storage.set("id", this.cle);
            this.nav.push(MenuPage);
          }
          // Si ca a échoué
          else {
            this.creerToast("Une erreur est survenue avec la bdd.");
          }
        }
        else{
          // le mail existe deja, il faut changer
          this.creerAlert("Le mail est déjà enregister", "Veuillez changer de mail !", "J'ai compris");
          
        }
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
