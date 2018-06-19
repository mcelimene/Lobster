import { Component } from '@angular/core';
import { MessagesPage } from '../messages/messages';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-conversations',
	templateUrl: 'conversations.html',
})
export class ConversationsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {

	}
	convs =
		[{ Id: 0, Name: 'Charlotte', Age: 18, Gender: "female", Img: "assets/imgs/avatar2.png", msg: "Salut!" },
		{ Id: 1, Name: 'Juliette', Age: 20, Gender: "female", Img: "assets/imgs/avatar3.png", msg: "Salut! Bien ?" },
		{ Id: 2, Name: 'Marie', Age: 22, Gender: "female", Img: "assets/imgs/avatar4.png", msg: "Salut! Bien ? Moi oui." }
		];


	ionViewDidLoad() {
		console.log('ionViewDidLoad ConversationsPage');
		console.log('Chargement des conversations...');
	}

	callConv(id: number, name: string) {
		this.navCtrl.push(MessagesPage, { id: id, name: name });
	}

	goToConv(id: number, name: string) {

		//console.log(id + ' ' + name);
		this.callConv(id, name);
	};

}
