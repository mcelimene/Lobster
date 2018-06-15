import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase';

@IonicPage()
@Component({
	selector: 'page-radar',
	templateUrl: 'radar.html',
})
export class RadarPage implements OnInit {
	latitude: any;
	longitude: any;

	constructor(public navCtrl: NavController,
				private geolocation: Geolocation
	) { }

	ngOnInit() {

		let watch = this.geolocation.watchPosition();

		watch.subscribe(
			(data) => {
				this.latitude = data.coords.latitude;
				this.longitude = data.coords.longitude;
				let user = firebase.auth().currentUser;

				//enrengistrement bdd
				firebase.database()
					.ref('gps/' + user.uid)
					.set({
						latitude: this.latitude,
						longitude: this.longitude
					});

				//recuperation bdd
				// firebase.database()
				// 	.ref('gps')
				// 	.orderByChild('latitude')
				// 	.startAt(this.latitude - 0.002)
				// 	.endAt(this.latitude + 0.002)
				// 	.once("child_moved", function (snapshot) {
				// 		//longitude
				// 		firebase.database().ref('gps/')
				// 			.child(snapshot.key)
				// 			.once("value", function (snap) {
				// 				console.log(snap.key)
				// 			})
				// 	});

				//recherche les profils trouver
			}
		);
	}
}





