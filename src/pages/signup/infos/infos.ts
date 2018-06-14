import { Component, ElementRef, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HomePage } from "../../home/home";
import * as firebase from "firebase";

@IonicPage()
@Component({
	selector: "page-infos",
	templateUrl: "infos.html"
})
export class InfosPage {
	public womanSelect: boolean = false;
	public manSelect: boolean = false;
	public select: string;
	public womanChoiceSelect: boolean = false;
	public manChoiceSelect: boolean = false;
	public choice: string;
	public buttonValid: boolean = false;
	@ViewChild("woman") public woman: ElementRef;
	@ViewChild("man") public man: ElementRef;
	@ViewChild("womanChoice") public womanChoice: ElementRef;
	@ViewChild("manChoice") public manChoice: ElementRef;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	getWoman() {
		if (this.manSelect) {
			this.manSelect = false;
		}
		this.womanSelect = true;
		this.select = this.woman.nativeElement.name;
		if (this.select && this.choice) {
			this.buttonValid = true;
		}
		return this.womanSelect;
	}

	getMan() {
		if (this.womanSelect) {
			this.womanSelect = false;
		}
		this.manSelect = true;
		this.select = this.man.nativeElement.name;
		if (this.select && this.choice) {
			this.buttonValid = true;
		}
		return this.manSelect;
	}

	getWomanChoice() {
		if (this.manChoiceSelect) {
			this.manChoiceSelect = false;
		}
		this.womanChoiceSelect = true;
		this.choice = this.womanChoice.nativeElement.name;
		if (this.select && this.choice) {
			this.buttonValid = true;
		}
		return this.womanChoiceSelect;
	}

	getManChoice() {
		if (this.womanChoiceSelect) {
			this.womanChoiceSelect = false;
		}
		this.manChoiceSelect = true;
		this.choice = this.manChoice.nativeElement.name;
		if (this.select && this.choice) {
			this.buttonValid = true;
		}
		return this.manChoiceSelect;
	}

	signUpNext() {
		return new Promise((resolve, reject) => {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					let userCurrent = firebase.auth().currentUser;
					firebase
						.database()
						.ref("user-list/" + userCurrent.uid)
						.update({
							sexe: this.select,
							choix: this.choice
						});
					// Navigation vers la page Home en faisant passer l'id dans la route
					this.navCtrl.setRoot(HomePage, {
						id: firebase.auth().currentUser.uid
					});
				} else {
					console.log("Aucun utilisateur connecté");
				}
			});
		});
	}
}
