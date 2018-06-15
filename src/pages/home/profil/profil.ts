import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../../models/User.model';
import { UserService } from '../../../services/user.service';
import * as firebase from 'firebase';

@Component({
	selector: 'page-profil',
	templateUrl: 'profil.html'
})
export class ProfilPage {

	user: User;
	public userId: any;

	constructor(public navCtrl: NavController,
				public userService: UserService
			) { }

	ngOnInit() {
		// Création d'un utilisateur vide
		this.user = new User("", "", "", "", "");
		// Récupération de l'Id de l'utilisateur
/*		this.userId = this.navParams.get("id");*/
		this.userId = firebase.auth().currentUser.uid;
		// Récupération du profil à partir de l'id
		this.userService.getUser(this.userId).then(
			(user: User) => { this.user = user;	});
	}
}
