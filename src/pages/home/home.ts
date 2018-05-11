// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { Facebook } from '@ionic-native/facebook';
//
// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {
//
//   isLoggedIn:boolean = false;
//   users: any;
//
//   constructor(public navCtrl: NavController, private fb: Facebook) {
//     fb.getLoginStatus()
//       .then(res => {
//         console.log(res.status);
//         if(res.status === "connect") {
//           this.isLoggedIn = true;
//         } else {
//           this.isLoggedIn = false;
//         }
//       })
//       .catch(e => console.log(e));
//   }
//
//   login() {
//     this.fb.login(['public_profile', 'user_friends', 'email'])
//       .then(res => {
//         if(res.status === "connected") {
//           this.isLoggedIn = true;
//           this.getUserDetail(res.authResponse.userID);
//         } else {
//           this.isLoggedIn = false;
//         }
//       })
//       .catch(e => console.log('Error logging into Facebook', e));
//   }
//
//   logout() {
//     this.fb.logout()
//       .then( res => this.isLoggedIn = false)
//       .catch(e => console.log('Error logout from Facebook', e));
//   }
//
//   getUserDetail(userid) {
//     this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
//       .then(res => {
//         console.log(res);
//         this.users = res;
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }
//
// }

import {
  Component
}
  from '@angular/core';
import {
  NavController
}
  from 'ionic-angular';
import {
  Facebook,
  FacebookLoginResponse
}
  from '@ionic-native/facebook';

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

    this.fb.login(['public_profile', 'user_friends', 'email','user_posts'])
      .then((res: FacebookLoginResponse) => {
        this.userId = res.authResponse.userID
        this.getUserInformation();
        // this.getUserFeeds();
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

          this.getUserFeeds();
        }, (error) => {
          alert(error);
        })
      }
    })
  }
  getUserFeeds() {
    this.fb.getLoginStatus().then((res) => {
      if (res.status == 'connected') {
        this.fb.api('/me/feed', []).then((res) => {
          this._data = res.data;
          // alert(JSON.stringify(this._data));
        }, (error) => {
          alert(error);
        })
      }
    })
  }
}
