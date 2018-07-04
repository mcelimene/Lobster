import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/User.model';
import { SettingsPage } from '../settings/settings';
import { RadarPage } from '../radar/radar';
import { SignOutPage } from '../signout/signout';


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
	// Récupération du menu de navigation
	@ViewChild(Nav) nav: Nav;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

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
			index: 2,
			icon: "contact"
		},
		{
			title: "Paramètres",
			pageName: SettingsPage,
			icon: "settings"
		},
		{
			title: "Déconnexion",
			pageName: SignOutPage,
			icon: "link"
		},
		{
			title: "Radar",
			pageName: RadarPage,
			index: 1,
			icon: "ionic"
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
		this.params = { user: this.user, id: this.userId };
	}

	openPage(page: PageInterface) {
		if (page.index != undefined) {
			// Ajout du paramètre index dans la route
			this.params.index = page.index;
		}

		if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {
			this.nav.getActiveChildNavs()[0].select(page.index, this.params);
		} else {
			this.nav.setRoot(page.pageName, this.params);
		}
	}
}
