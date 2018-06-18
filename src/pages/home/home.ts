import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConversationsPage } from '../home/conversations/conversations';
import { DemandesPage } from '../home/demandes/demandes';
import { RadarPage } from '../radar/radar';
import { User } from '../../models/User.model';
import { TabsPage } from '../tabs/tabs';

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage implements OnInit {
	// Utilisateur
	user: User;
	// Id de l'utilisateur passé dans la route
	public userId: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ngOnInit() {
		// Récupération de l'utilisateur
		this.user = this.navParams.get("user");
		// Récupération de l'Id de l'utilisateur
		this.userId = this.navParams.get("id");
	}

	goToProfil() {
		// Redirection vers la page Profil
		this.navCtrl.push(TabsPage, {
			// Passage des paramètres dans la route
			index: 1,
			id: this.userId,
			user: this.user
		});
	}

	goToRadar() {
		this.navCtrl.push(RadarPage);
	}

	goToDemandes() {
		this.navCtrl.push(DemandesPage);
	}

	goToMessages() {
		this.navCtrl.push(ConversationsPage);
	}
}
