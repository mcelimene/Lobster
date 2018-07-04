import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/User.model";

import { HomePage } from '../../home/home';
import { ProfilPage } from '../../home/profil/profil';
import { RadarPage } from "../../radar/radar";

@Component({
	templateUrl: "tabs.html"
})
export class TabsPage implements OnInit {
	// Pages disponibles dans les tabs
	home = HomePage;
	radar = RadarPage;
	profile = ProfilPage;
	// Utilisateur
	user: User;
	// id de l'utilisateur passé dans la route
	public userId: "string";
	// Index de la page demandée (menu des tabs)
	public index: number;
	// Paramètres à faire passer dans la route
	public params;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public userService: UserService
	) {}

	ngOnInit() {
		// Récupération de l'utilisateur
		this.user = this.navParams.get("user");
		// Récupération de l'id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Récupération de l'id de l'utilisateur
		this.index = this.navParams.get("index") || 0;
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId, index: this.index };

	}
}
