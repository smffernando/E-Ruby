import { Component } from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {AppConfig} from "../../../config/app.config";

@Component({
  selector: 'page-add-employee-to-request',
  templateUrl: 'add-employee-to-request.html',
})
export class AddEmployeeToRequestPage {

  appConfig = AppConfig;
  callback : any;
  itemIndex : any;
  identityDetails : any = {};
  isView : boolean = false;

  pageData : any = {
    projectName : "",
    startDate : "",
    endDate : "",
    type : "",
    expertise : "",
    skills : [],
    allocationType : "",
    role : "",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams , public events : Events) {

    this.identityDetails = this.navParams.get("identityDetails");
    if(this.identityDetails.mode==="add"){
      this.pageData.projectName = this.navParams.get("projectName");
      this.pageData.role = this.navParams.get("role");
    }else if(this.identityDetails.mode==="view2"){
      this.isView = true;
      this.pageData.projectName = this.navParams.get("projectName");
      this.pageData = this.navParams.get("data");;
    }
    this.reFormatData(this.pageData);
  }

  ionViewDidLoad() {}

  reFormatData(data){
    this.pageData.pr = this.getName(data.role,this.appConfig.PROJECT_ROLES_FOR_ASSIGN);
  }

  getName(data,objArray){
    let arrayLength = objArray.length;
    for(let i=0 ; i<arrayLength;i++){
      if(data === objArray[i].value){
        return objArray[i].name;
      }
    }
    return data;
  }

  onClickAdd(value : {}){
    if(this.identityDetails.mode==="add"){
      this.events.publish('request:success',value, this.identityDetails.index);
      this.navCtrl.pop();
    }else if(this.identityDetails.mode==="view"){
      this.events.publish('request:edit',value, this.identityDetails.index);
      this.navCtrl.pop();
    }

  }


}
