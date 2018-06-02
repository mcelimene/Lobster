import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  	constructor(public navCtrl: NavController, public navParams: NavParams, infs : []) {
  	}
	
  	ionViewDidLoad() {
  	  	console.log('ionViewDidLoad MessagesPage');
  	}

  	conv = [{Id:0, Name:'Charlotte', Age:18, Gender:"female", Img:"assets/imgs/logo.png", msg:""},
  			{Id:0, Name:'Charlotte', Age:18, Gender:"female", Img:"assets/imgs/logo.png", msg:""},
  			{Id:0, Name:'Charlotte', Age:18, Gender:"female", Img:"assets/imgs/logo.png", msg:""},
  	];
}
