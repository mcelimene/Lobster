import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { InfosPage } from "./infos/infos";

@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})


export class SignupPage {

	auth: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams) { }
	ionViewDidLoad() {
		// console.log("ionViewDidLoad SignupPage");
	}

	last() {
		this.navCtrl.push(InfosPage);
	}
}

