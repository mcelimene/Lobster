import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class ProfilService {

  constructor() {}

	getDataService() {
       return new Promise (
        (resolve, reject) => {
          var userId = firebase.auth().currentUser.uid;
          firebase.database().ref('profil/' + userId).once('value').then(
            (data) =>  { resolve(data.val()); },
            (error) => { reject(error); }
            )
        }
       )
	}
}