import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../../models/User.model';
import { UserService } from '../../../services/user.service';


@Component({
	selector: "page-profile",
	templateUrl: "profile.html"
})
export class ProfilePage {
	index: number;
	user: User;
	public userId: string;
	public params;
	public userAge: any;
	public isMan: boolean;
	public wantMan: boolean;
	public emptyDescription: boolean;
	public emptyPhilosophie: boolean;
	public emptyLike: boolean;
	public emptyNotLike: boolean;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public userService: UserService
	) { }


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
		// Variables ngIf pour l'affichage du genre et du choix
		this.isMan = this.user.sexe === "homme";
		this.wantMan = this.user.choix === "homme";
		// Variable ngIf pour l'affichage des différents formulaires
		this.emptyDescription = this.user.description === "";
		this.emptyPhilosophie = this.user.philosophie === "";
		this.emptyLike = this.user.like === "";
		this.emptyNotLike = this.user.notlike === "";
	}

	updateProfil() {
		// mise à jour du profil dans la bdd
		this.userService.updateUser(this.userId, this.user);
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId };
		this.userService.presentToast("Votre profil a bien été mis à jour");
		// rafraichissement de la page avec le profil à jour
		// Redirection vers la page Profil
		this.navCtrl.parent.select(2, this.params);
	}

}
