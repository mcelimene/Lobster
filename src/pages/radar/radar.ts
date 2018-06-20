import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase';
import { User } from '../../models/User.model';


@Component({
	selector: "page-radar",
	templateUrl: "radar.html"
})
export class RadarPage implements OnInit {
	latitude: any;
	longitude: any;

	constructor(
		public navCtrl: NavController,
		private geolocation: Geolocation,
		public navParams : NavParams
	) {}
	index: number;
	user: User;
	public userId: string;
	public params;
	ngOnInit() {
		// Récupération de l'utilisateur
		this.user = this.navParams.get("user");
		// Récupération de l'Id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Récupération de l'Id de l'utilisateur
		this.index = this.navParams.get("index");
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId };
		console.log(this.user);

		let watch = this.geolocation.watchPosition();

		watch.subscribe(data => {
			this.latitude = data.coords.latitude;
			this.longitude = data.coords.longitude;
			let user = firebase.auth().currentUser;

			//enrengistrement bdd
			firebase
				.database()
				.ref("gps/" + user.uid)
				.set({
					latitude: this.latitude,
					longitude: this.longitude
				});

			//recuperation bdd
			firebase
				.database()
				.ref("gps")
				.orderByChild("latitude")
				.startAt(this.latitude - 0.002)
				.endAt(this.latitude + 0.002)
				.once("value", function(snapshot) {
					console.log(snapshot.val());
				});

			//recherche les profils trouver
		});
	}
}





