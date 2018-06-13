import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilPage } from '../home/profil/profil';
import { ConversationsPage } from '../home/conversations/conversations';
import { DemandesPage } from '../home/demandes/demandes';
import { RadarPage } from '../radar/radar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  goToProfil() {
    	this.navCtrl.push(ProfilPage);
  }

	goToRadar() {
    	this.navCtrl.push(RadarPage);
  }

	goToDemandes() {
    	this.navCtrl.push(DemandesPage);
  }

  goToMessages() {
    	this.navCtrl.push(ConversationsPage);
  }


}
