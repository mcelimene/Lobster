import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  constructor(public navCtrl: NavController) {

  }

//Json de la bdd pour mon profils.
  items = [{

    pseudo:'McQueen75',
    passeword:'Password',
    age:'23',
    mail:'julienbraga@hotmail.fr',
    sexe:'Homme',
    orientation:' des femmes',
    description:'Je suis un homme sérieux ',
    aime:"J'aime les animaux",
    aimepas:"Je n'aime pas le gâteau au chocolat"

	//this.navCTRL.push("page-".item);

    //console.log("Selected Item", item);

}];

itemSelected(item: string) {
    console.log("Selected Item", item);

}

}
