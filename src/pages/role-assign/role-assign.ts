import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {AppConfig} from "../../config/app.config";
import {ApiProvider} from "../../providers/api/api";

@Component({
  selector: 'page-role-assign',
  templateUrl: 'role-assign.html',
})
export class RoleAssignPage {

  pageData : any = {};
  appConfig = AppConfig;

  // user : any = {
  //   "roleId":'',
  //   "fullName":'',
  //   "eId": null};

  constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl: AlertController, public apiCtrl : ApiProvider) {
    this.pageData = navParams.data;
    // this.user.roleId = this.pageData.roleId;
    // this.user.fullName = this.pageData.fullName;
    // this.user.eId = this.pageData.eId;
  }

  roleChange(){
    var req = this.pageData;
    this.apiCtrl.httpPost(AppConfig.service_urls.USER_SIGNUP + '/update',req).then((data : any) => {


      if(data.nModified>0){
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'User Role Updated.!',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      }else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'No changes detected.!',
          buttons: ['OK']
        });
        alert.present();
      }

    });
  }

  ionViewDidLoad() {

  }

}
