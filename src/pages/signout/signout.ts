import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/User.model';
import { AuthService } from '../../services/auth.service';
import { WelcomePage } from '../welcome/welcome';
import { TabsPage } from '../tabs/tabs';

@Component({
	selector: 'page-signout',
	templateUrl: 'signout.html',
})
export class SignOutPage implements OnInit {

	user: User;
	public userId: string;
	public params;
	index: number;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public alertCtrl: AlertController,
				public authService: AuthService) { }

	ngOnInit() {
		// Récupération de l'utilisateur
		this.user = this.navParams.get("user");
		// Récupération de l'Id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Récupération de l'Id de l'utilisateur
		this.index = this.navParams.get("index");
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId };
		const prompt = this.alertCtrl.create({
			title: "Déconnexion",
			message: "Êtes-vous sûr de vouloir vous déconnecter ?",
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
						this.authService.signOutUser();
						this.navCtrl.setRoot(WelcomePage);
					}
				}
			]
		});
		prompt.present();
	}
}
