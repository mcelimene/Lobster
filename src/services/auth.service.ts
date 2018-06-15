import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
	constructor() {}

	// Enregistrement d'un utilisateur dans la base de données
	signUpUser(email: string, password: string) {
		return new Promise((resolve, reject) => {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(
					() => {
						resolve();
					},
					(error)=> {
						reject(error);
					}
				);
		});
	}

	currentId() {
		return firebase.auth().currentUser.uid;
	}

	// Connexion d'un utilisateur par email et mot de passe
	signInUser(email: string, password: string) {
		return new Promise((resolve, reject) => {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(
					() => {
						resolve();
					},
					error => {
						reject(error);
					}
				);
		});
	}



}
