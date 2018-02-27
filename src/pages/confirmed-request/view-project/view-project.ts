import {Component} from "@angular/core";
import {NavController, NavParams, Events, AlertController} from "ionic-angular";
import {ApiProvider} from "../../../providers/api/api";
import {ViewPage} from "../../view/view";
import {AddEmployeeToRequestPage} from "../add-employee-to-request/add-employee-to-request";
import {AppConfig} from "../../../config/app.config";
import {ConfirmedRequestPage} from "../confirmed-request";

@Component({
  selector: 'view-project',
  templateUrl: 'view-project.html',
})
export class ViewProjectPage {

  projectDetails : any = {};
  createdRequests : any = [];
  showSendBtn : boolean = false;
  identityDetails : any = {
    index : null,
    mode : ""
  }

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

  constructor(public navCtrl: NavController, public navParams: NavParams , public apiCtrl : ApiProvider , public events:Events , public alertCtrl: AlertController ) {
    this.events.subscribe('request:success',(value , index)=>{
        this.createdRequest(value , index);
    });
    this.events.subscribe('request:edit',(value , index)=>{
      this.editRequest(value , index);
    });
  }

  ionViewDidLoad() {
    this.projectDetails = this.navParams.data;
  }

  onClickView(item){
    this.navCtrl.push(ViewPage,item);
  }

  onClickAdd(item , index){
    this.identityDetails.index = index;
    this.identityDetails.mode = "add";
    this.navCtrl.push(AddEmployeeToRequestPage, {
      projectName : this.projectDetails.projectName,
      role : item.projectRole,
      identityDetails : this.identityDetails
    });
  }

  createdRequest(data,index){

      this.createdRequests.push(data);
      this.projectDetails.requestData.splice(index,1);
      if( this.projectDetails.requestData.length == 0){
        this.showSendBtn = true;
      }
    }

  editRequest(data,index){
    this.createdRequests.splice(index,1);
    this.createdRequests.push(data);
  }

  onClickEditOnFilled(data,index){
    this.identityDetails.index = index;
    this.identityDetails.mode = "view";
    this.navCtrl.push(AddEmployeeToRequestPage,{
      data : data,
      identityDetails : this.identityDetails
    });
  }


  onSendRequest(){
    var req = {
      projectName : this.projectDetails.projectName,
      projectId : this.projectDetails.projectId,
      filledData : this.createdRequests
    }
    this.apiCtrl.httpPost(AppConfig.service_urls.ACCEPT_REQUEST , req).then((data : any) => {
      let alert = this.alertCtrl.create({
        subTitle: 'Successfully Added!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.setRoot(ConfirmedRequestPage);
    })
  }





}
