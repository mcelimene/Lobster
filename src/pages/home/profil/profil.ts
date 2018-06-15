import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User.model';
import { UserService } from '../../../services/user.service';
import { NativeStorage } from '@ionic-native/native-storage';
import * as firebase from 'firebase';

@Component({
	selector: 'page-profil',
	templateUrl: 'profil.html'
})
export class ProfilPage {

	user: User;
	public userId: any;

	constructor(public navCtrl: NavController, 
				public userService: UserService,
				private nativeStorage: NativeStorage) { }

	ngOnInit() {
		// Création d'un utilisateur vide
		this.user = new User("", "", "", "");
		// Récupération de l'Id de l'utilisateur
/*		this.userId = this.navParams.get("id");*/
		this.userId = firebase.auth().currentUser.uid;
		// Récupération du profil à partir de l'id
		this.userService.getUser(this.userId).then(
			(user: User) => { this.user = user;	});
		this.nativeStorage.setItem('User', 'prout')
  		.then(
    		() => console.log('Stored item!'),
    		error => console.error('Error storing item', error)
  		);
	}



}