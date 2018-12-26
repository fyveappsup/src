import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { QrCodePage } from '../qrcode/qrcode';
import { MyProfilPage} from '../myprofil/myprofil';
import { ScanPage } from '../scan/scan';
import { HistoriquePage} from '../historique/historique';
import { HomePage } from './../home/home';
import { BadgePage } from './../badge/badge';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  serveur: boolean = false;

  constructor(public nav: NavController, public storage: Storage) {
  }

  ionViewWillEnter(){
    this.storage.get('serveur').then((val) => {this.serveur = val;});
  }

  public viewQrcodePage(){
    this.nav.push(QrCodePage);
  }

  public viewMyProfilPage(){
    this.nav.push(MyProfilPage);
  }

  public viewScanPage(){
    this.nav.push(ScanPage);
  }

  public viewHistoriquePage(){
    this.nav.push(HistoriquePage);
  }

  public viewBadgePage(){
    this.nav.push(BadgePage);
  }

  public deconnection(){
    this.storage.clear();
    this.nav.setRoot(HomePage);
  }
}