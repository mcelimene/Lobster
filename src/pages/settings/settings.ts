import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
import { WelcomePage } from '../welcome/welcome';
import { TabsPage } from '../navigation/tabs/tabs';

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
				public alertCtrl: AlertController,
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

	onRemove() {
		const prompt = this.alertCtrl.create({
			title: "Suppression du compte",
			message:
				"Êtes-vous sûr de vouloir supprimer votre compte ?",
			buttons: [
				{
					text: "Non",
					handler: data => {
						this.navCtrl.setRoot(TabsPage, this.params);
					}
				},
				{
					text: "Oui",
					handler: data => {
						this.userService.removeUser(this.userId);
						this.navCtrl.setRoot(WelcomePage);
					}
				}
			]
		});
		prompt.present();
	}
}
