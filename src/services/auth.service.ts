import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

	constructor() { }

	signUpUser(email: string, password: string) {
		return new Promise(
			(resolve, reject) => {
				firebase.auth().createUserWithEmailAndPassword(email, password).then(
					() => {
						resolve();
					},
					(error) => {
						reject(error);
					}
				);
			}
		);
	}

	uploadFile(file: File) {
		return new Promise(
			(resolve, reject) => {
				const almostUniqueFileName = Date.now().toString();
				const upload = firebase.storage().ref()
					.child('img/' + almostUniqueFileName + file.name).put(file);
				upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
					() => {
						console.log('Chargement…');
					},
					(error) => {
						console.log('Erreur de chargement ! : ' + error);
						reject();
					},
					() => {
						resolve(upload.snapshot.ref.getDownloadURL());
					}
				);
			}
		);
	}


	signInUser(email: string, password: string) {
		return new Promise(
			(resolve, reject) => {
				firebase.auth().signInWithEmailAndPassword(email, password).then(
					() => {
						resolve();
					},
					(error) => {
						reject(error);
					}
				);
			}
		);
	}
}
