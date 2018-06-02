import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from "firebase";
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Connect with database FireBase
    var config = {
      apiKey: "AIzaSyBr4DB66cwyKGCkdMmL-sKpbZk8KC9aNq4",
      authDomain: "lobster-9e53f.firebaseapp.com",
      databaseURL: "https://lobster-9e53f.firebaseio.com",
      projectId: "lobster-9e53f",
      storageBucket: "lobster-9e53f.appspot.com",
      messagingSenderId: "581839150674"
  };
  firebase.initializeApp(config);

  }
}
