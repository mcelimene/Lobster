import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { User } from '../../../models/User.model';
import { UserService } from "../../../services/user.service";
import { MenuPage } from '../../menu/menu';


@Component({
	selector: "page-profil",
	templateUrl: "profil.html"
})
export class ProfilPage {
	index: number;
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
		// Récupération de l'Id de l'utilisateur
		this.index = this.navParams.get("index");
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId };

		// Calcul de l'age
		this.userAge = this.userService.getAge(this.user.birthDay, this.user.birthMonth, this.user.birthYear);
		// Variables pour l'affichage du genre et du choix
		this.isMan = this.user.sexe === "homme";
		this.wantMan = this.user.choix === "homme";
	}

	updateProfil() {
		// mise à jour du profil dans la bdd
		this.userService.updateUser(this.userId, this.user);
		this.userService.presentToast("Votre profil a bien été mis à jour");
		// rafraichissement de la page avec le profil à jour
		this.navCtrl.setRoot(MenuPage, {
			// Passage des paramètres dans la route
			index: 1,
			id: this.userId,
			user: this.user
		});
	}
}
