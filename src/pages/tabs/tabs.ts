import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';
import { ProfilPage } from '../home/profil/profil';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {

	home = HomePage;
	profile = ProfilPage;
	welcome = WelcomePage;

	constructor() {

	}
}
