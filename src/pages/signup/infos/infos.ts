import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HomePage } from "../../home/home";
import { User } from "../../../models/User.model";
import { UserService } from "../../../services/user.service";


@Component({
	selector: "page-infos",
	templateUrl: "infos.html"
})
export class InfosPage implements OnInit {
	user: User;
	id: string;
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

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public userService: UserService) {}

	ngOnInit()  {
		this.user = this.navParams.get("user");
		this.id = this.navParams.get("id");
	}

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

	onUpdateUser() {
		// Assignation des données recueillies à l'objet l'utilisateur
		this.user.sexe = this.select;
		this.user.choix = this.choice;
		// Mise à jour des données de l'utilisateur
		this.userService.updateUser(this.id, this.user);
		// Navigation vers la page Home
		this.navCtrl.push(HomePage, {
			// Passage des paramètres dans la route
			user: this.user,
			id: this.id
		});
	}
}
