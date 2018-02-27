import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AppConfig} from '../../config/app.config';
import {AllEmployeesPage} from "../all-employees/all-employees";

/**
 * Generated class for the EditEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-employee',
  templateUrl: 'edit-employee.html',
})
export class EditEmployeePage {

  pageData : any = {};

  constructor(public apiCtrl : ApiProvider ,public navCtrl: NavController,
              public navParams: NavParams, public alertCtrl: AlertController,public appCtrl:App) {
    this.pageData = navParams.data;
  }

  ionViewDidLoad() {
  }

  addFormData(value){

    var req = value;
    req.Id = this.pageData.Id;


      this.apiCtrl.httpPut(AppConfig.service_urls.EMPLOYEE,req).then((data : any) => {

        if(data.nModified>= 1){
          let alert = this.alertCtrl.create({
            subTitle: 'Successfully Updated!',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(AllEmployeesPage);
        }else{
          let alert = this.alertCtrl.create({
            subTitle: 'No Change Found!',
            buttons: ['OK']
          });
          alert.present();
        }

      });
  }

}
