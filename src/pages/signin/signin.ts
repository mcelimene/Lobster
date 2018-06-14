import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
	selector: "page-signin",
	templateUrl: "signin.html"
})
export class SigninPage implements OnInit {
	public signinForm: FormGroup;
	public errorMessage: string;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private navCtrl: NavController
	) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.signinForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: [
				"",
				[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]
			]
		});
	}

	signin() {
		const email = this.signinForm.get("email").value;
		const password = this.signinForm.get("password").value;

		this.authService.signInUser(email, password).then(
			() => {
				console.log("connecté");
				this.navCtrl.setRoot(HomePage, {
					id: firebase.auth().currentUser.uid
				});
			},
			error => {
				if (error["code"] === "auth/invalid-email") {
					this.authService.presentToast("Adresse email incorrecte");
				} else if (error["code"] === "auth/user-not-found") {
					this.authService.presentToast("Utilisateur introuvable");
				} else if (error["code"] === "auth/wrong-password") {
					this.authService.presentToast("Mot de passe incorrect");
				}
			}
		);
	}
}
