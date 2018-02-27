import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AppConfig} from "../../config/app.config";
import {ViewAcceptedRequestPage} from "./view-accepted-request/view-accepted-request";

@Component({
  selector: 'page-all-accepter-requests',
  templateUrl: 'all-accepter-requests.html',
})
export class AllAccepterRequestsPage {

  acceptedRequestList : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , public apiCtrl : ApiProvider) {
    this.getAcceptedRequestList();
  }

  ionViewDidLoad() {

  }

  getAcceptedRequestList(){
    this.apiCtrl.httpGet(AppConfig.service_urls.ACCEPT_REQUEST).then((data : any)=>{
        this.acceptedRequestList = data;
    })
  }


  onViewProject(item){
    this.navCtrl.push(ViewAcceptedRequestPage,item);
  }

}
