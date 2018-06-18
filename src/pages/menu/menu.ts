import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/User.model';


export interface PageInterface {
	title: string,
	pageName: string,
	tabComponent?: any,
	index?: number,
	icon: string
}

@IonicPage()
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
	// Index de la page demandée
	public index: number;
	// Paramètres à faire passer dans la route
	public params;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	@ViewChild(Nav) nav: Nav;

	pages: PageInterface[] = [
		{
			title: "Home",
			pageName: "TabsPage",
			tabComponent: "HomePage",
			index: 0,
			icon: "home"
		},
		{
			title: "Profil",
			pageName: "TabsPage",
			tabComponent: "ProfilPage",
			index: 1,
			icon: "information-circle"
		},
		{
			title: "Déconnexion",
			pageName: "TabsPage",
			icon: "information-circle"
		}
	];

	ngOnInit() {
		// Récupération de l'utilisateur
		this.user = this.navParams.get("user");
		// Récupération de l'id de l'utilisateur
		this.userId = this.navParams.get("id");
		// Récupération de l'id de l'utilisateur
		this.index = this.navParams.get("index");

		// Passage des paramètres dans la route
		this.params = { user: this.user, id: this.userId, index: this.index };
	}

	openPage(page: PageInterface) {}

	isActive(page: PageInterface) {

	}
}
