import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';

@IonicPage()
@Component({
	selector: 'page-infos',
	templateUrl: 'infos.html',
})
export class InfosPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	last() {
		this.navCtrl.push(HomePage);
	}

}
