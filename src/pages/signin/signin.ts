import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
import { MenuPage } from '../menu/menu';

@Component({
	selector: "page-signin",
	templateUrl: "signin.html"
})
export class SigninPage implements OnInit {
	public signinForm: FormGroup;
	public errorMessage: string;
	public user: User;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private navCtrl: NavController,
		private userService: UserService
	) {}

	// Initialisation du formulaire
	ngOnInit() {
		this.initForm();
	}

	// Initialisation du formulaire
	initForm() {
		this.signinForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: [
				"",
				[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]
			]
		});
	}

	onSignin() {

		// Récupération des données du formulaire
		const email = this.signinForm.get("email").value;
		const password = this.signinForm.get("password").value;

		// Connexion de l'utilisateur
		this.authService.signInUser(email, password).then(
			() => {
				console.log("connecté");
				let id = this.authService.currentId();
				// Récupération du profil à partir de l'id
				this.userService.getUser(id).then(
					(user: User) => {
						this.user = user;
						// Redirection vers la page Home
						this.navCtrl.setRoot(MenuPage, {
						// Passage des paramètres dans la route
							index: 0,
							id: id,
							user: this.user
						});
					}
				);
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
