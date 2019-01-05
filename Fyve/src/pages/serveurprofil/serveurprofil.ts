import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PaiementPage } from '../paiement/paiement';

@Component({
  selector: 'page-serveurprofil',
  templateUrl: 'serveurprofil.html'
})
export class ServeurProfilPage {

  // profil serveur
  profil = null;
  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl : AlertController) {
    this.profil = this.navParams.get('profil');
    this.profil = JSON.parse(this.profil);
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
              let alertNote = this.alertCtrl.create({
                title: 'Note incorrect',
                message : 'Veuillez entrer une note entre 1 et 5 compris.',
                buttons : ['OK']
              });
              alertNote.present();

            }
            else{
              // enregistrer l'avis
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

}

