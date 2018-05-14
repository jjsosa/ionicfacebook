import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private fb: Facebook) {

  }

  public userId: string;
  _firstName: String;
  _gender: String;
  _lastName: String;
  _name: String;
  _data:any;

  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.userId = res.authResponse.userID
        this.getUserInformation();
        this.navCtrl.push('MyprofilePage', {
          firstName: this._firstName,
          lastName: this._lastName,
          name: this._name,
          gender: this._gender,
          data:this._data
        })
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
  getUserInformation() {
    this.fb.getLoginStatus().then((response) => {
      if (response.status == 'connected') {
        this.fb.api('/' + response.authResponse.userID + '?fields=id,name,gender,first_name,last_name', []).then((response) => {
          this._name = JSON.parse(JSON.stringify(response)).name;
          this._gender = JSON.parse(JSON.stringify(response)).gender;
          this._firstName = JSON.parse(JSON.stringify(response)).id;
          this._lastName = JSON.parse(JSON.stringify(response)).last_name;
        }, (error) => {
          alert(error);
        })
      }
    })
  }
}