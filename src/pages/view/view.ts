import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, App} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AppConfig} from "../../config/app.config";

@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})

export class ViewPage {

  private pageData : any = {};
  appConfig : any = AppConfig;

  constructor(public apiCtrl : ApiProvider ,public navCtrl: NavController,
              public navParams: NavParams, public alertCtrl: AlertController,public appCtrl:App) {

  }

  ionViewDidLoad() {
    this.pageData = this.navParams.data;
    this.reFormatData(this.pageData);
    console.log(this.pageData);
  }

  goBack(){
    this.navCtrl.pop();
  }

  reFormatData(data){

    this.pageData.ex = this.getName(data.expertise,this.appConfig.EXPERTISE_FOR_ASSIGN);
    this.pageData.bl = this.getName(data.basedLocation,this.appConfig.BASED_LOCATION_FOR_ASSIGN);
    this.pageData.pr = this.getName(data.projectRole,this.appConfig.PROJECT_ROLES_FOR_ASSIGN);

  }

  getName(data,objArray){
    let arrayLength = objArray.length;
    for(let i=0 ;i<arrayLength;i++){
      if(data === objArray[i].value){
        return objArray[i].name;
      }
    }
    return data;
  }

}
