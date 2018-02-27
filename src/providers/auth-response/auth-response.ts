import { Injectable } from '@angular/core';
import {ApiProvider} from "../api/api";
import {AppConfig} from "../../config/app.config";
import {App, AlertController, Events} from "ionic-angular";

@Injectable()
export class AuthResponseProvider {

  constructor(public appCtrl: App,public apiService : ApiProvider , public alertCtrl: AlertController,public events: Events) {
  }

  isAuthorized : boolean ;
  loginResponse : any = {};

  public getLoginResponse(){
    return this.loginResponse;
  }

  private create(data){

    this.isAuthorized = true;
    this.loginResponse = data;
    this.loginResponse.isAuthorized = true;
  }

  private destroy(){
    this.isAuthorized = false;
    this.loginResponse = {};
  }

  login(req_obj){

   this.apiService.httpPut(AppConfig.service_urls.USER_SIGNUP,req_obj).then((data : any) => {

     if( data !== null){
       if(data.message === "Login Success" && data.content !== {}){
         this.create(data.content);
         this.events.publish('user:login');
       }else{
         this.destroy();
         let alert = this.alertCtrl.create({
           subTitle: 'Login Failed.Try again',
           buttons: ['OK']
         });
         alert.present();
       }
     }else{
       this.destroy();
       let alert = this.alertCtrl.create({
         subTitle: 'Login Failed.Try again',
         buttons: ['OK']
       });
       alert.present();
     }
   });
 }

  logout(){
    this.destroy();
    this.events.publish('user:loggedOut');
 }

}
