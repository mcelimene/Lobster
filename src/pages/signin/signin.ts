import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

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
		public toastCtrl: ToastController
	) {}

	presentToast(message: string) {
		const toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'middle'
		});
		toast.present();
	}

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
				this.navCtrl.setRoot(HomePage);
			},
			error => {
				if (error["code"] === "auth/invalid-email") {
					this.errorMessage = "Adresse email incorrecte";
					console.log(this.errorMessage);
					this.presentToast("Adresse email incorrecte");
				} else if (error["code"] === "auth/user-not-found") {
					this.errorMessage = "Utilisateur introuvable";
					this.presentToast("Utilisateur introuvable");
					console.log(this.errorMessage);
				} else if (error["code"] === "auth/wrong-password") {
					this.errorMessage = "Mot de passe incorrect";
					this.presentToast("Mot de passe incorrect");
					console.log(this.errorMessage);
				}
			}
		);
	}
}
