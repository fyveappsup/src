import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PaiementPage } from '../paiement/paiement';

@Component({
  selector: 'page-serveurprofil',
  templateUrl: 'serveurprofil.html'
})
export class ServeurProfilPage {

  // Avis recu par le serveur
  listAvisRecus = null;
  lesAvisRecus = [];
  nbAvis = 0;
  noteMoyenne = null;

  // profil serveur
  profil = null;
  idClient = null;

  constructor(public nav: NavController,public firebaseProvider: FirebaseProvider, public navParams: NavParams,public storage : Storage, public alertCtrl : AlertController, public toastCtrl : ToastController) {
    this.profil = this.navParams.get('profil');
    this.profil = JSON.parse(this.profil);
    this.storage.get("id").then((val) => {this.idClient=val;});
  }

  ionViewWillEnter(){
     // Avis recus
      this.listAvisRecus = this.firebaseProvider.getAvisRecusById(this.profil.id);
      this.listAvisRecus.forEach(element => {
        this.lesAvisRecus=[];
        this.lesAvisRecus=element;
        this.getNbAvisRecus();
      });
  }

  public paiement() {
  
      this.nav.push(PaiementPage, {
      "Serveur": this.profil
    }); 
  }

  public alertAvis(){
    let alert = this.alertCtrl.create({
      title: 'Mon avis',
      subTitle : 'Entrer un commentaire et donner une note à votre serveur',
      inputs: [
        {
          name: 'commentaire',
          placeholder: 'Commentaire',
          type : "text"
        },
        {
          name: 'note',
          placeholder: 'Votre note (entre 1 & 5 )',
          type : 'number',
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Valider',
          handler: data => {
            // enrrgistrer l'avis
            var note = this.noteIsCorrect(data.note);
            console.log(note);
            if(note==="0"){
              // Note incorrect
              this.creerAlert('Note incorrect','Veuillez entrer une note entre 1 et 5 compris.')
            }
            else{
              // enregistrer l'avis
              var effectuer = null;
              effectuer= this.firebaseProvider.addAvisItem(this.idClient, this.profil.id, data.commentaire, Number(note));
              if(effectuer==null){
                this.creerAlert("Une erreur est survenue !", "Une erreur est survenue avec la base de données");
              }
              else{
                this.creerToast("Votre a été envoyé avec succès !");
              }
            }
          }
        }
      ]
    });
    alert.present();
  }

  public noteIsCorrect(note :string) : string{
    var noteNumber = Number(note);
    if(noteNumber>=1 && noteNumber<=5){
      return noteNumber.toFixed(0);
    }
    else{
      return "0";
    }

  }


  public getNomUser(id:string) : string{
    var nom ="";
    this.firebaseProvider.getUserById(id).forEach(user =>{
      nom = user.prenom + " "+ user.nom;
    });
    return nom;
  }

  public getNbAvisRecus(){
    this.noteMoyenne = 0;
    this.nbAvis = 0;
    this.lesAvisRecus.forEach(item =>{
      this.nbAvis++;
      this.noteMoyenne += item.note;
    });
    this.noteMoyenne = this.noteMoyenne / this.nbAvis;
  }

  public creerAlert(title :string, message : string){
    let alert = this.alertCtrl.create({
      title: title,
      message : message,
      buttons : ['OK']
    });
    alert.present();
  }

  public creerToast(message: string) {
    var toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}

