import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import { UserService } from '../../services/user.service';

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
		private navCtrl: NavController,
		private userService: UserService
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
					this.userService.presentToast("Adresse email incorrecte");
				} else if (error["code"] === "auth/user-not-found") {
					this.userService.presentToast("Utilisateur introuvable");
				} else if (error["code"] === "auth/wrong-password") {
					this.userService.presentToast("Mot de passe incorrect");
				}
			}
		);
	}
}
