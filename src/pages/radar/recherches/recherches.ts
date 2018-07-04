import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recherches',
  templateUrl: 'recherches.html',
})
export class RecherchesPage {

	public tabUsers: any=[];


  constructor(	public navCtrl: NavController, 
  				      public navParams: NavParams) {

      this.tabUsers = this.navParams.get("tab"); 
  }

  ngOnInit() {       
  }

  ionViewDidLoad() {
  }

}
