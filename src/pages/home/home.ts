import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilPage } from '../home/profil/profil';
import { ConversationsPage } from '../home/conversations/conversations';
import { DemandesPage } from '../home/demandes/demandes';
import { RadarPage } from '../radar/radar';
import { User } from '../../models/User.model';

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage implements OnInit {
	user: User;
	userId: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ngOnInit() {
		// Création d'un utilisateur vide
		this.user = new User("", "", "", "", "");
		// Récupération de l'Id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Récupération de user
		this.user = this.navParams.get("user");
	}

	goToProfil() {
		// Navigation vers la page Profil
		this.navCtrl.push(ProfilPage, {
			// Passage des paramètres dans la route
			user: this.user,
			id: this.userId
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
