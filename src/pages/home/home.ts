import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConversationsPage } from '../home/conversations/conversations';
import { DemandesPage } from '../home/demandes/demandes';
import { RadarPage } from '../radar/radar';
import { User } from '../../models/User.model';


@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage implements OnInit {
	// Utilisateur
	user: User;
	// Id de l'utilisateur passé dans la route
	public userId: string;
	// Paramètres de la route
	public params: any;

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
		// Passage des paramètres dans la route
		this.params = { id: this.userId, user: this.user };
		// Redirection vers la page Profil
		this.navCtrl.parent.select(1, this.params);
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
