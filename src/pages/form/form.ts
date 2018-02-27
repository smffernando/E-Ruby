import {Component } from '@angular/core';
import {  NavController, NavParams ,AlertController,App} from 'ionic-angular';
import {AppConfig} from '../../config/app.config';
import {ApiProvider} from "../../providers/api/api";
import {AuthResponseProvider} from "../../providers/auth-response/auth-response";
import {ViewPage} from "../view/view";
import {SendRequestHomePage} from "../send-request-home/send-request-home";

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  // @ViewChild(Nav) nav: Nav;
  // itemList : any;
  user = {};
  al : any;
  appConfig : any = {
    projctRoles : AppConfig.PROJECT_ROLES_FOR_ASSIGN,
    expertise : AppConfig.EXPERTISE_FOR_ASSIGN,
    basedlocations : AppConfig.BASED_LOCATION_FOR_ASSIGN
  };
  sendRequestFormData : any = [];
  frmObj : any  = {
    allocation :"",
    allocationType :"",
    basedLocation :"",
    bookingType :"",
    endDate :"",
    expertise :"",
    projectRole :"",
    rate :"",
    skills :[],
    startDate :"",};
  initialPageData : any = { projectName : "",
                            projectId : ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController , public appCtrl: App , public apiCtrl : ApiProvider , public authResponse : AuthResponseProvider) {
    // this.getUserDetails();
  }

  ionViewDidLoad() {
    this.initialPageData = this.navParams.data;
    if(this.authResponse.getLoginResponse().isAuthorized == false){
      this.authResponse.logout();
    }
  }

  resetForm(){

    this.frmObj = {
      allocation :"",
      allocationType :"",
      basedLocation :"",
      bookingType :"",
      endDate :"",
      expertise :"",
      projectRole :"",
      rate :"",
      skills :[],
      startDate :"",
    };
  }

  addFormData(value : {}){
    this.sendRequestFormData.push(value);
    this.resetForm();
    // this.apiCtrl.httpPost(AppConfig.API_HOST_ADDRESS + '/admin',value).then(data => {
    //
    //   let alert = this.alertCtrl.create({
    //     subTitle: 'Successfully Added!',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    //   this.getUserDetails();
    // });
  }

  onDelete(msg){
    this.sendRequestFormData.splice(this.sendRequestFormData.indexOf(msg), 1);
  }

  onSendRequest(){

    if(this.sendRequestFormData.length>0){
      var req = {
        projectId : this.initialPageData.projectId,
        projectName : this.initialPageData.projectName,
        requestData : this.sendRequestFormData
      }

      this.apiCtrl.httpPost(AppConfig.service_urls.SEND_REQUEST,req).then((data : any) =>{
        if(data != null){
          this.promptMsg('Successfully Sent the Request!');
          this.sendRequestFormData = [];
          this.navCtrl.setRoot(SendRequestHomePage);
        }else{
          this.promptMsg('Sending Failed!');
        }
      });
    }else{
      this.promptMsg('Sending Failed!');
    }
  }

  onClickView(item){
    this.navCtrl.push(ViewPage,item);
  }

  promptMsg(msg){
    let alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
