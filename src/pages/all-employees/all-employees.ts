import { Component } from '@angular/core';
import {NavController, NavParams, App} from 'ionic-angular';
import {AuthResponseProvider} from "../../providers/auth-response/auth-response";
import {ApiProvider} from "../../providers/api/api";
import {AppConfig} from '../../config/app.config';
import {EditEmployeePage} from "../edit-employee/edit-employee";

@Component({
  selector: 'page-all-employees',
  templateUrl: 'all-employees.html',
})
export class AllEmployeesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public appCtrl: App , public apiCtrl : ApiProvider , public authResponse : AuthResponseProvider) {
  }

  ionViewDidLoad() {
    this.getEmployees();
  }

  employees : any = [];

  getEmployees(){
    this.apiCtrl.httpGet(AppConfig.service_urls.EMPLOYEE).then(data => {
      this.employees = data;
    });
  }

  onClickView(item){
    this.navCtrl.push(EditEmployeePage,item);
  }

}
