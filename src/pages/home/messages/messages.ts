import { Component } from '@angular/core';
import { ConversationsPage } from '../conversations/conversations';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-messages',
	templateUrl: 'messages.html',
})
export class MessagesPage {
	name: string = null;
	id: number = null;
	load: string = null;
	message: string;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.name = navParams.get('name');
		this.id = navParams.get('id');

	}

	ionViewDidLoad() {
		if (this.name && this.id) {
			this.load = "loadedFrom";
		}
		console.log(this);
	}

	ionViewWillLeave() {
		if (this.load == "loadedFrom") {
			this.navCtrl.pop();
			this.navCtrl.push(ConversationsPage);
		}
	}

	conv = [{ Id: 0, Name: 'Charlotte', Age: 18, Gender: "female", Img: "assets/imgs/avatar2.png", Msg: "Salut c'est charlotte.", Who: 0 },
	{ Id: 1, Name: 'Charline', Age: 19, Gender: "female", Img: "assets/imgs/avatar1.png", Msg: "Enchanté ! ", Who: 1 },
	{ Id: 2, Name: 'Clémence', Age: 20, Gender: "female", Img: "assets/imgs/avatar1.png", Msg: "Tu veux causer ?", Who: 1 }];

	goToProfile(id: number) {
		console.log(id);

	}
}
