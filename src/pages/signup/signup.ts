import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { InfosPage } from "./infos/infos";
import * as firebase from "firebase";

@IonicPage()
@Component({
	selector: "page-signup",
	templateUrl: "signup.html"
})
export class SignupPage implements OnInit {
	public registerForm: FormGroup;
	public errorMessage: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private authService: AuthService,
		private formBuilder: FormBuilder
	) {}

	last() {
		this.navCtrl.push(InfosPage);
	}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.registerForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: [
				"",
				[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]
			],
			birthday: ["", [Validators.required]],
			pseudo: ["", [Validators.required]]
		});
	}

	register() {
		const birthday = this.registerForm.get("birthday").value;
		const email = this.registerForm.get("email").value;
		const password = this.registerForm.get("password").value;
		const pseudo = this.registerForm.get("pseudo").value;

		this.authService.signUpUser(email, password).then(
			() => {
				let userCurrent = firebase.auth().currentUser;
				firebase
					.database()
					.ref("user-list/" + userCurrent.uid)
					.set({
						birthday: birthday,
						pseudo: pseudo
					});
				this.navCtrl.push(InfosPage);
			},
			error => {
				this.errorMessage = error;
				console.log(this.errorMessage);
			}
		);
	}
}

