import { Component } from '@angular/core';
import { NavController,  AlertController, App} from 'ionic-angular';
import {AuthResponseProvider} from "../../providers/auth-response/auth-response";
import {ApiProvider} from "../../providers/api/api";
import {AppConfig} from '../../config/app.config';
import {AllEmployeesPage} from "../all-employees/all-employees";

/**
 * Generated class for the AddEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-employee',
  templateUrl: 'add-employee.html',
})
export class AddEmployeePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController ,
              public appCtrl: App , public apiCtrl : ApiProvider , public authResponse : AuthResponseProvider) {
  }

  ionViewDidLoad() {
    // if(this.authResponse.getLoginResponse().isAuthorized == false){
    //   this.logout();
    // }else{
    //   this.profile = this.authResponse.getLoginResponse();
    // }
  }

  addFormData(value : {}){

    this.apiCtrl.httpPost(AppConfig.service_urls.EMPLOYEE,value).then((data : any) => {

      let alert = this.alertCtrl.create({
        subTitle: 'Successfully Added!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.setRoot(AllEmployeesPage);
      // this.getUserDetails();
    });
  }

}
