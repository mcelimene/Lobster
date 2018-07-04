import { Injectable } from "@angular/core";
import { User } from "../models/User.model";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;
import { ToastController } from "ionic-angular";
import * as moment from "moment";

@Injectable()
export class UserService {

	constructor(public toastCtrl: ToastController) { }

	// Enregistrement d'un utilisateur dans la base de données
	createUser(user: User) {
		let userCurrent = firebase.auth().currentUser;
		firebase
			.database()
			.ref("user-list/" + userCurrent.uid)
			.set(user);
	}

	// Mise à jour d'un utilisateur dans la base de données
	updateUser(id: string, user: User) {
		firebase
			.database()
			.ref("user-list/" + id)
			.update(user);
	}

	// Récupération d'un utilisateur
	getUser(id: string) {
		// Création d'une promesse pour la récupération d'un utilisateur
		return new Promise((resolve, reject) => {
			firebase
				.database()
				.ref("/user-list/" + id)
				.once("value")
				.then(
					(data: DataSnapshot) => {
						resolve(data.val());
					},
					error => {
						reject(error);
					}
				);
		});
	}

	// Téléchargement et enregistrement de la photo
	uploadFile(file: File) {
		return new Promise((resolve, reject) => {
			const almostUniqueFileName = Date.now().toString();
			const upload = firebase
				.storage()
				.ref()
				.child("images/" + almostUniqueFileName + file.name)
				.put(file);
			upload.on(
				firebase.storage.TaskEvent.STATE_CHANGED,
				() => {
					console.log("Chargement…");
				},
				error => {
					console.log("Erreur de chargement ! : " + error);
					reject();
				},
				() => {
					resolve(upload.snapshot.ref.getDownloadURL());
				}
			);
		});
	}

	// Popup
	presentToast(message: string) {
		const toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: "middle"
		});
		toast.present();
	}

	// Récupération de l'âge d'un utilisateur
	getAge(birthDay: string, birthMonth: string, birthYear: string) {
		// Date de naissance
		let birthDayUser = moment(birthYear + "-" + birthMonth + "-" + birthDay, 'YYYY-MM-DD');
		// Date actuelle
		let dateCurrent = moment();
		// Retourne l'âge
		let age = dateCurrent.diff(birthDayUser, 'year');
		return age;
	}

	// Supression d'un utilisateur
	removeUser(id: string) {

		// Récupération de l'utilisteur à partir de l'id
		this.getUser(id).then(
			(user: User) => {
				let userToRemove = user;
				if (userToRemove.photo) {
					// Suppression de la photo de l'utilisateur
					const storageRef = firebase.storage().refFromURL(userToRemove.photo);
					storageRef.delete().then(
						() => {
							console.log('Photo supprimée');

						}
					).catch(
						(error) => {
							console.log('Photo non trouvée' + error);
						}
					);
				}
				// Suppression du profil de l'utilisateur
				const profileRef = firebase.database().ref('/user-list/' + id);
				profileRef.remove().then(
					() => {
						console.log('Profil supprimé');

					}
				).catch(
					(error) => {
						console.log('Profil non trouvé' + error);
					}
				);
				// Supression de l'utilisateur
				const userRef = firebase.auth().currentUser;
				userRef.delete().then(
					() => {
						console.log("Utilisateur supprimé");
					})
					.catch(error => {
						console.log("Utilisateur non trouvé" + error);
					});
			}
		);
	}
}

