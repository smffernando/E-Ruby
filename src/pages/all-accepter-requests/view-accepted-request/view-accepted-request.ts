import {Component} from "@angular/core";
import {NavController, NavParams, Events, AlertController} from "ionic-angular";
import {ApiProvider} from "../../../providers/api/api";
import {AddEmployeeToRequestPage} from "../../confirmed-request/add-employee-to-request/add-employee-to-request";

@Component({
  selector: 'view-accepted-request',
  templateUrl: 'view-accepted-request.html',
})
export class ViewAcceptedRequestPage {

  pageData : any = {};
  //   projectName : "",
  //   filledData : [
  //     {
  //       role : "",
  //       startDate : "",
  //       endDate : "",
  //       type : "",
  //       expertise : "",
  //       skills : [],
  //       allocationType : "",
  //     }
  //   ],
  //   projectId : "",
  // };

  constructor(public navCtrl: NavController, public navParams: NavParams , public apiCtrl : ApiProvider , public events:Events , public alertCtrl: AlertController ) {
    this.pageData = this.navParams.data;
  }

  onClickView(item){

    this.navCtrl.push(AddEmployeeToRequestPage, {
      projectName : this.pageData.projectName,
      role : item.role,
      identityDetails : {
        mode : "view2"
      },
      data : item
    });
  }

}
