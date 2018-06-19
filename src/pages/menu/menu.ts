import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/User.model';
import { DisconnectionPage } from '../disconnection/disconnection';
import { SettingsPage } from '../settings/settings';


export interface PageInterface {
	title: string,
	pageName: any,
	index?: number,
	icon: string
}

@Component({
	selector: "page-menu",
	templateUrl: "menu.html"
})

export class MenuPage implements OnInit {
	rootPage: any = TabsPage;
	// Utilisateur
	user: User;
	// id de l'utilisateur passé dans la route
	public userId: "string";
	// Index de la page demandée (menu des tabs)
	public index: number;
	// Paramètres à faire passer dans la route
	public params;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	@ViewChild(Nav) nav: Nav;

	pages: PageInterface[] = [
		{
			title: "Accueil",
			pageName: TabsPage,
			index: 0,
			icon: "home"
		},
		{
			title: "Profil",
			pageName: TabsPage,
			index: 1,
			icon: "contact"
		},
		{
			title: "Paramètres",
			pageName: SettingsPage,
			icon: "settings"
		},
		{
			title: "Déconnexion",
			pageName: DisconnectionPage,
			icon: "link"
		}
	];

	ngOnInit() {
		// Récupération de l'utilisateur
		this.user = this.navParams.get("user");
		// Récupération de l'id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Récupération de l'id de l'utilisateur
		this.index = this.navParams.get("index") || 0;
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId, index: this.index };
	}

	openPage(page: PageInterface) {
		if (page.index) {
			// Ajout du paramètre index dans la route
			this.params.index = page.index;
		}

		if (this.nav.getActiveChildNavs() && page.index != undefined) {
			this.nav.getActiveChildNavs()[0].select(page.index);
		} else {
			this.nav.setRoot(page.pageName, this.params);
		}
	}
}
