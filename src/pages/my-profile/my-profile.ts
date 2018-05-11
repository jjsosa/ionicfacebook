import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  firstName:String;
  gender:String;
  lastName:String;
  data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firstName = navParams.get("firstName");
    this.lastName = navParams.get("lastName");
    this.gender = navParams.get("gender");
    this.data = navParams.get("data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

}
