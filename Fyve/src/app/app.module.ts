import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const firebaseConfig = {
  apiKey: "AIzaSyAvPKtXLF5JKBMobqFmtJCpgMgPl_dUoXY",
  authDomain: "fyve-d346b.firebaseapp.com",
  databaseURL: "https://fyve-d346b.firebaseio.com",
  projectId: "fyve-d346b",
  storageBucket: "fyve-d346b.appspot.com",
  messagingSenderId: "1033400827102"
};


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ScanPage } from '../pages/scan/scan';
import { QrCodePage } from '../pages/qrcode/qrcode';
import { MyProfilPage } from '../pages/myprofil/myprofil';
import { ServeurProfilPage } from '../pages/serveurprofil/serveurprofil';
import { HistoriquePage } from '../pages/historique/historique';
import { PaiementPage } from '../pages/paiement/paiement';
import { BadgePage } from '../pages/badge/badge';
import { MenuPage } from '../pages/menu/menu';

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    MenuPage,
    LoginPage, 
    RegisterPage, 
    ScanPage, 
    QrCodePage, 
    MyProfilPage,
    ServeurProfilPage,
    HistoriquePage, 
    PaiementPage, 
    BadgePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxQRCodeModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__FyveLocaldb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    MenuPage,
    LoginPage,
    RegisterPage, 
    ScanPage, 
    QrCodePage, 
    MyProfilPage,
    ServeurProfilPage,
    HistoriquePage, 
    PaiementPage, 
    BadgePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    BarcodeScanner
  ]
})
export class AppModule {}
