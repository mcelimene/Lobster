import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { InfosPage } from "./infos/infos";
import { UserService } from "../../services/user.service";

@IonicPage()
@Component({
	selector: "page-signup",
	templateUrl: "signup.html"
})
export class SignupPage implements OnInit {
	// Formulaire (méthode réactive)
	public registerForm: FormGroup;
	// Fichier en cours de téléchargement
	public fileIsUploading = false;
	// Url du fichier
	public fileUrl: string;
	// Fichier téléchargé
	public fileUploaded = false;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private userService: UserService
	) {}

	ngOnInit() {
		// Initialisation du formulaire
		this.initForm();
	}

	// Initialisation du formulaire
	initForm() {
		this.registerForm = this.formBuilder.group({
			// Email requis, type email demandé
			email: ["", [Validators.required, Validators.email]],
			// Mot de passe requis, au moins 6 caractères
			password: [
				"",
				[
					Validators.required,
					Validators.pattern(/[0-9a-zA-Z]{6,}/)
				]
			],
			// Date de naissance requise
			birthday: ["", [Validators.required]],
			// Pseudo requis
			pseudo: ["", [Validators.required]]
		});
	}

	// Fonction de téléchargement de l'image
	onUploadFile(file: File) {
		// Fichier en cours de téléchargement
		this.fileIsUploading = true;
		// Téléchargemet de l'image
		this.userService.uploadFile(file).then(
			(url: string) => {
			// Récupération de l'url de l'image après téléchargement
			this.fileUrl = url;
			// Téléchargement termné
			this.fileIsUploading = false;
			// Photo téléchargée
			this.fileUploaded = true;
			// Popup indiquant que la photo a été chargée
			this.userService.presentToast("Photo chargée");
			}
		);
	}

	// Fonction lancée lors d'un changement d'état dans la vue
	detectFiles(event) {
		// Lancement de la fonction de téléchargement de l'image
		this.onUploadFile(event.target.files[0]);
	}

	onSaveUser() {
		// Récupération des données du formulaire
		const birthday = this.registerForm.get("birthday").value;
		const email = this.registerForm.get("email").value;
		const password = this.registerForm.get("password").value;
		const pseudo = this.registerForm.get("pseudo").value;
		// Initialisation des données non encore fournies
		// const choix = "";
		// const sexe = "";

		// Enregistrement de l'utilisateur après l'enregistrement de l'authentification
		this.authService.signUpUser(email, password).then(
			() => {
				// Enregistement des données de l'utilisateur par le noeud de son ID
				this.userService.createUser(birthday, pseudo);
				// Redirection vers la deuxième page d'authentification
				this.navCtrl.push(InfosPage);
			},
			(error) => {
				// Affichage des erreurs
				console.log(error);
			}
		);
	}

	// Bouton désactivé jusqu'à ce que le formulaire soit valide et que l'image soit chargée
	isThisDisabled() {
		// Si le formulaire est invalide
		if (this.registerForm.invalid) {
			// Bouton désactivé
			return true;
		} else {
			// Sinon, si l'image est chargée
			if (!this.fileUploaded) {
				// Bouton désactivé
				return true;
			} else {
				// SInon, bouton activé
				return false;
			}
		}
	}
}

