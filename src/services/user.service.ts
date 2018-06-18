import { Injectable } from "@angular/core";
import { User } from "../models/User.model";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;
import { ToastController } from "ionic-angular";

@Injectable()
export class UserService {

	constructor(public toastCtrl: ToastController) {}

	// Enregistrement d'un utilisateur dans la base de données
	createUser(user: User) {
		let userCurrent = firebase.auth().currentUser;
		firebase
			.database()
			.ref("user-list/" + userCurrent.uid)
			.set(user);
	}

	// Enregistrement d'un utilisateur dans la base de données
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

	// Calcul l'age en fonction de la string YYYY-MM-DD et de la date courante
	getAge(birth : string) {
		var age: any;
	    var today = new Date();
	    var nowyear = today.getFullYear();
	    var nowmonth = today.getMonth();
	    var nowday = today.getDate();

		var birthyear = birth.substr(0, 4);
		var birthmonth = birth.substr(5, 2);
		var birthday = birth.substr(8, 2);
	   
	    var age_month = nowmonth - parseInt(birthmonth);
	    var age_day = nowday - parseInt(birthday);
	   
	    if (age_month < 0 || (age_month == 0 && age_day <0)) {
	    	age = (nowyear - parseInt(birthyear)) - 1;
	    } else { age = nowyear - parseInt(birthyear); }
	    return age;    
	}	
}