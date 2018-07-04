import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RadarService } from '../../services/radar.service';
import { RecherchesPage } from '../radar/recherches/recherches';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import * as firebase from 'firebase';

@Component({
	selector: 'page-radar',
	templateUrl: 'radar.html',
})

export class RadarPage implements OnInit {

	myUser: User;
	myUserId: string;
	public nbId: number;
  	tabUsersFindId: any=[];
  	tabUsers: any=[];

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
        		public radarService: RadarService,
        		public userService: UserService) { }

	ngOnInit() {
		// Récupération de l'utilisateur
		this.myUser = this.navParams.get("user");
		// Récupération de l'Id de l'utilisateur
		this.myUserId = this.navParams.get("id");
	}

    ionViewDidLoad(){
    	// récupération dans la bdd des id des utilisateurs dans la zone
    	this.radarService.getUsersRadar().then((result : QuerySnapshot) => {
    		// tableau des id reçus de la bdd
        	this.tabUsersFindId = result.docs.map(function (result) { return result.id; });
    	});
    }

    // fonction asynchrone pour récupérer les données voulues d'un User avec son id
    async getUserInfosAsync(id: string){
    	return await this.userService.getUser(id).then((user: User) => {
    			// calcul de l'age
    			let age = this.userService.getAge(user.birthDay, user.birthMonth, user.birthYear);
    			return {sexe: user.sexe, pseudo: user.pseudo, age: age, photo: user.photo};
    	});
    }

    goToRecherches() {
    	// boucle pour remplir le tableau des info des profils trouvés
	    this.nbId = this.tabUsersFindId.length;
		for (let i = 0; i < this.nbId; i++) {
    		let id = this.tabUsersFindId[i];
    		// test pour ne pas s'inclure dans les résultats
    		if (id != this.myUserId) {
				// Récupération des données des Users dans un tableau
				this.getUserInfosAsync(id).then( data => {
					// Test pour ne pas traiter les profils du mauvais sexe
	    			if (data.sexe === this.myUser.choix) {
	    			 	this.tabUsers.push ({id: id, pseudo: data.pseudo, age: data.age, photo: data.photo});
	    			}
				});
    		}
		}
		//Redirection vers la page Recherches en passant le tableau des profils trouvés
		this.navCtrl.push(RecherchesPage, {tab : this.tabUsers});
	}
}
