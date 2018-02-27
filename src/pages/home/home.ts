import { Component } from '@angular/core';
import {NavController, App, AlertController} from 'ionic-angular';
import {AuthResponseProvider} from "../../providers/auth-response/auth-response";
import {ViewUserDetailsPage} from "../view-user-details/view-user-details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profile : any = {};

  constructor(public navCtrl: NavController , public authResponse : AuthResponseProvider ,
              public appCtrl: App , public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    if(this.authResponse.getLoginResponse().isAuthorized){
      this.profile = this.authResponse.getLoginResponse();
      this.setRole(this.profile.roleId);
    }else{
      this.authResponse.logout();
    }
  }

  setRole(id){

    switch (id){
      case 1 :
        this.profile.role = "Admin";
        break;
      case 2 :
        this.profile.role = "Resource Manger";
        break;
      case 3 :
        this.profile.role = "Project Manager";
        break;
      case 4 :
        this.profile.role = "Employee";
        break;
      default :
        this.profile.role = null;
        break;
    }
  }

  editProfile(){
    this.navCtrl.push(ViewUserDetailsPage)
  }

  logout(){
    this.authResponse.logout();
  }

}
