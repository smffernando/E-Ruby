import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormPage} from "../form/form";

/**
 * Generated class for the SendRequestHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-send-request-home',
  templateUrl: 'send-request-home.html',
})
export class SendRequestHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  addFormData(value : {}){
    this.navCtrl.setRoot(FormPage,value);
  }

}
