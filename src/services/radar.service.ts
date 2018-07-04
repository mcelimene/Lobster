import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Geolocation } from '@ionic-native/geolocation';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable()

export class RadarService {

  // Variables pour la géolocalisation
  latitude: number;
  longitude: number;
  time: any;
  
  constructor(private geolocation: Geolocation) {
     let watch = this.geolocation.watchPosition();
     watch.subscribe(
         (data) => {
                     this.latitude = data.coords.latitude;
                     this.longitude = data.coords.longitude;
                     this.time = data.timestamp;     
     });
  }
 
  getUsersRadar() {
    // Création d'une promesse pour la récupération d'un utilisateur
    return new Promise((resolve) => {
      firebase.firestore().collection("gps")
                          // .where('time','>',this.time - 10000)
                          .orderBy("latitude")
                          .orderBy("longitude")
                          .startAt(this.latitude - 0.08, this.longitude - 0.08)
                          .endAt(this.latitude + 0.08, this.longitude + 0.08)                          
        .get().then(function(Snap: QuerySnapshot) {
        resolve (Snap);
      });
    });
  }

}
      