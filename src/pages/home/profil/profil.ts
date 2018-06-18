import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../../models/User.model';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'page-profil',
	templateUrl: 'profil.html'
})
export class ProfilPage {

	user: User;
	public userId: any;
	public params;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public userService: UserService
	) { }

	ngOnInit() {
		// Récupération de l'utilisateur
		this.user = this.navParams.get("user");
		// Récupération de l'Id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId };
	}
}
