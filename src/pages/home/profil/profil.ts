import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../../models/User.model';
import { UserService } from '../../../services/user.service';

@Component({
	selector: "page-profil",
	templateUrl: "profil.html"
})
export class ProfilPage {
	user: User;
	public userId: string;
	public params;
	userAge: any;
	public isMan: boolean;
	public wantMan: boolean;
	@ViewChild("champDescription") champDescription;
	@ViewChild("champPhilo") champPhilo;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public userService: UserService
	) {}

	ngOnInit() {
		// Récupération de l'utilisateur
		this.user = this.navParams.get("user");
		// Récupération de l'Id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId };
		// Calcul de l'age
		this.userAge = this.userService.getAge(this.user.birthday);
		// Variables pour l'affichage du genre et du choix
		this.isMan = this.user.sexe === "homme";
		this.wantMan = this.user.choix === "homme";
	}

	updateProfil(value: string) {
		console.log(value);
	}
}
