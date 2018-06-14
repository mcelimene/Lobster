import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilPage } from '../home/profil/profil';
import { ConversationsPage } from '../home/conversations/conversations';
import { DemandesPage } from '../home/demandes/demandes';
import { RadarPage } from '../radar/radar';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage implements OnInit {
	user: User;
	public userId: "string";

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public userService: UserService
	) {}

	ngOnInit() {
		// Création d'un utilisateur vide
		this.user = new User("", "", "", "", "");
		// Récupération de l'Id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Récupération du profil à partir de l'id
		this.userService.getUser(this.userId).then(
			(user: User) => {
			this.user = user;
		});
	}

	goToProfil() {
		this.navCtrl.push(ProfilPage);
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
