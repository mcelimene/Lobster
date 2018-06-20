import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
import { WelcomePage } from '../welcome/welcome';

@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	user: User;
	public userId: string;
	public params;
	index: number;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public userService: UserService) {
	}

	ngOnInit() {
		// Récupération de l'utilisateur
		this.user = this.navParams.get("user");
		// Récupération de l'Id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Récupération de l'Id de l'utilisateur
		this.index = this.navParams.get("index");
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId };
	}

	onRemove(id: string) {
		this.userService.removeUser(id);
		this.navCtrl.setRoot(WelcomePage);
	}

}
