import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-graphe',
  templateUrl: 'graphe.html'
})
export class GraphePage {
  @ViewChild('Canvas') Canvas : ElementRef;
  Chart : any;

  lesPaiementsDonnes = [];
  lesPaiementsRecus = [];
  
  constructor(public navCtrl: NavController, public params : NavParams,) {
    this.lesPaiementsDonnes = params.get('PaiementDonnes');
    this.lesPaiementsRecus = params.get('PaiementRecus');
  }

  ionViewDidEnter(){
    var Janvier = 0, Fevrier = 0, Mars = 0, Avril = 0, Mai = 0, Juin = 0, Juillet = 0, Aout = 0, Septembre = 0, Octobre = 0, Novembre = 0, Decembre  = 0;
    this.lesPaiementsRecus.forEach(item =>{
      console.log("date recu", new Date(item.date).getMonth());
      switch(new Date(item.date).getMonth()){
        case 0 : 
          Janvier+=item.montant;
          break;
        case 1 : 
          Fevrier+=item.montant;
          break;
        case 2 : 
          Mars+=item.montant;
          break;
        case 3 : 
          Avril+=item.montant;
          break;
        case 4 : 
          Mai+=item.montant;
          break;
        case 5 : 
          Juin+=item.montant;
          break;
        case 6 : 
          Juillet+=item.montant;
          break;
        case 7 : 
          Aout+=item.montant;
          break;
        case 8 : 
          Septembre+=item.montant;
          break;
        case 9 : 
          Octobre+=item.montant;
          break;
        case 10 : 
          Novembre+=item.montant;
          break;
        case 11 : 
          Decembre+=item.montant;
          break;
      }
    });

    var JanvierDonnes = 0, FevrierDonnes = 0, MarsDonnes = 0, AvrilDonnes = 0, MaiDonnes = 0, JuinDonnes = 0, JuilletDonnes = 0, AoutDonnes = 0, SeptembreDonnes = 0, OctobreDonnes = 0, NovembreDonnes = 0, DecembreDonnes  = 0;
    this.lesPaiementsDonnes.forEach(item =>{
      console.log("date donne", new Date(item.date).getMonth());
      switch(new Date(item.date).getMonth()){
        case 0 : 
          JanvierDonnes+=item.montant;
          break;
        case 1 : 
          FevrierDonnes+=item.montant;
          break;
        case 2 : 
          MarsDonnes+=item.montant;
          break;
        case 3 : 
          AvrilDonnes+=item.montant;
          break;
        case 4 : 
          MaiDonnes+=item.montant;
          break;
        case 5 : 
          JuinDonnes+=item.montant;
          break;
        case 6 : 
          JuilletDonnes+=item.montant;
          break;
        case 7 : 
          AoutDonnes+=item.montant;
          break;
        case 8 : 
          SeptembreDonnes+=item.montant;
          break;
        case 9 : 
          OctobreDonnes+=item.montant;
          break;
        case 10 : 
          NovembreDonnes+=item.montant;
          break;
        case 11 : 
          DecembreDonnes+=item.montant;
          break;
      }
    });

    this.Chart = new Chart(this.Canvas.nativeElement, {
      type: 'horizontalBar',
			data: {
				labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre','Octobre', 'Novembre', 'Decembre'],
				datasets: [{
          label : "Mes Fyves reçus",
					data: [
            Janvier,
            Fevrier,
            Mars,
            Avril,
            Mai, 
            Juin,
            Juillet,
            Aout,
            Septembre, 
            Octobre,
            Novembre,
            Decembre
          ],
          backgroundColor : '#9DE4D1',
        },
        {
          label : "Mes Fyves donnés",
					data: [
            JanvierDonnes,
            FevrierDonnes,
            MarsDonnes,
            AvrilDonnes,
            MaiDonnes, 
            JuinDonnes,
            JuilletDonnes,
            AoutDonnes,
            SeptembreDonnes, 
            OctobreDonnes,
            NovembreDonnes,
            DecembreDonnes
          ],
          backgroundColor : '#a29c9f',
        }]
      },		
      options: {
        responsive: true,
        title: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              beginAtZero:true
          },
            scaleLabel: {
              display: true,
              labelString: 'Valeur des Fyves (en €)'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: false
            }
          }]
        }
      }
    });
  }
}
