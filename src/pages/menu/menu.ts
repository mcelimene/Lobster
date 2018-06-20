import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/User.model';
import { DisconnectionPage } from '../disconnection/disconnection';
import { SettingsPage } from '../settings/settings';
import { RadarPage } from '../radar/radar';


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
	@ViewChild(Nav) nav: Nav;
	page: string;
	radar: boolean = false;

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
		},
		{
			title: "Radar",
			pageName: RadarPage,
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
		// Récupération du nom de la page
		this.page = this.navParams.get("pageName");
		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId };
	}

	openPage(page: PageInterface) {
		if (page.index) {
			// Ajout du paramètre index dans la route
			this.params.index = page.index;
		}

		if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {
			this.nav.getActiveChildNavs()[0].select(page.index, this.params);
			console.log("ici, index :" + this.params.index);
		} else {
			this.nav.setRoot(page.pageName, this.params);
			console.log("là, index :" + this.params.index);
		}
	}
}
