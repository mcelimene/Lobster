import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { User } from '../../../models/User.model';
import { UserService } from "../../../services/user.service";

@Component({
	selector: 'page-profil',
	templateUrl: 'profil.html'
})
export class ProfilPage {

	user: User;
	userId: string;
	userAge : any;
	public isMan: boolean;
	public wantMan: boolean;
	@ViewChild('champDescription') champDescription;
	@ViewChild('champPhilo') champPhilo;


	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private userService: UserService				
			) { }

	ngOnInit() {
		// Création d'un utilisateur vide
		this.user = new User("", "", "", "", "");
		// Récupération de l'Id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Récupération de user
		this.user = this.navParams.get("user");
		// Calcul de l'age
		this.userAge = this.userService.getAge(this.user.birthday);
		// variables pour l'affichage du genre et du choix
		this.isMan = (this.user.sexe === 'homme');
		this.wantMan = (this.user.choix === 'homme');	
	}

	updateProfil(value: string) {
		console.log(value);

	}
}
