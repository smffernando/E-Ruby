import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {AppConfig} from "../../config/app.config";
import {ApiProvider} from "../../providers/api/api";
import {RoleAssignPage} from "../role-assign/role-assign";
import {AuthResponseProvider} from "../../providers/auth-response/auth-response";

/**
 * Generated class for the AllUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-all-users',
  templateUrl: 'all-users.html',
})
export class AllUsersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams ,public apiCtrl : ApiProvider , public authResponse : AuthResponseProvider  ) {
  }

  ionViewDidLoad() {
    this.getUsersDetails();
  }

  users : any = [];
  auth : any = {};

  getUsersDetails(){
    this.apiCtrl.httpGet(AppConfig.service_urls.USER_SIGNUP).then((data : any) => {
      this.users = data;
      this.auth = this.authResponse.getLoginResponse();
      // let uLength = this.users.length;
      // console.log(uLength);
      // for(let i=0;i < uLength ; i++){
      //   console.log(this.users[i].eId);
      //   if(data[i].eId == this.auth.eId){
      //     this.users.slice(0,1);
      //      console.log(this.users);
      //     break;
      //   }
      //
      // }
    });
  }

  onClickView(item){
    this.navCtrl.push(RoleAssignPage,item);
  }

}
