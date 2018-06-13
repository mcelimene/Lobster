import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase';

/**
 * Generated class for the RadarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-radar',
  templateUrl: 'radar.html',
})
export class RadarPage {
  latitude: any;
  longitude: any;



  constructor(public navCtrl: NavController, private geolocation: Geolocation) {


    this.geolocation.getCurrentPosition().then((resp) => {

    }).catch((error) => {
      console.log('Error getting location', error);
    });


    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {

      console.log('latitude :', data.coords.latitude);
      console.log('longitude :', data.coords.longitude);
      // data.coords.latitude
      // data.coords.longitude
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
      var user = firebase.auth().currentUser;
      console.log(user.uid);

      firebase.database().ref('gps/' + user.uid)
        .set({
          latitude: this.latitude,
          longitude: this.longitude

        });

    });

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RadarPage');


  }

}





