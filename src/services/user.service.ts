import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class UserService {

	user: User;

	constructor() { }

	getUser(id: string) {
		return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/user-list/' + id).once('value').then(
					(data: DataSnapshot) => {
						resolve(data.val());

					},
					(error) => {
						reject(error);
					}
				)
			}
		)
	}
}
