import {Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AppConfig} from '../../config/app.config';
import {ViewProjectPage} from "./view-project/view-project";

@Component({
  selector: 'page-confirmed-request',
  templateUrl: 'confirmed-request.html',
})
export class ConfirmedRequestPage {

  projectList : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , public apiCtrl : ApiProvider) {
  }

  ionViewDidLoad() {
    this.getConfirmedRequests();
  }

  getConfirmedRequests(){
    this.apiCtrl.httpGet(AppConfig.service_urls.SEND_REQUEST).then((data:any)=>{
      if(data != null){
        this.projectList = data.content ;
      }
      })
  }

  onViewProject(item){
    this.navCtrl.push(ViewProjectPage,item);
  }

}
