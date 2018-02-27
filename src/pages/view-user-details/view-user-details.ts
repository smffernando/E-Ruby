import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {AuthResponseProvider} from "../../providers/auth-response/auth-response";
import {Validators, FormBuilder ,FormGroup } from '@angular/forms';
import {EmailValidator} from "../../form-validators/emailValidator";
import {AppConfig} from "../../config/app.config";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the ViewUserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-user-details',
  templateUrl: 'view-user-details.html',
})
export class ViewUserDetailsPage {

  signUp : any = {};
  private signUpForm : FormGroup;

  pageData : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl: AlertController,
              public authResponse : AuthResponseProvider , public formBuilder: FormBuilder , public apiCtrl : ApiProvider ) {
    // this.pageData = navParams.data;
    // if(this.authResponse.getLoginResponse().isAuthorized){
      this.pageData = this.authResponse.getLoginResponse();
    // }else{
    //   this.authResponse.logout();
    // }

    this.signUpForm = this.formBuilder.group({
      firstName: [this.pageData.firstName, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: [this.pageData.lastName, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      fullName: [this.pageData.fullName, Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [this.pageData.email, Validators.compose([Validators.required, EmailValidator.isValid])],
      eId: [this.pageData.eId, Validators.compose([Validators.maxLength(10), Validators.required])],
      userName: [this.pageData.userName, Validators.compose([Validators.maxLength(30), Validators.required])],
    });
  }

  validate(): boolean {

    if (this.signUpForm.valid) {
      return true;
    }

    var firstName  = this.signUpForm.controls['firstName'];
    var lastName = this.signUpForm.controls['lastName'];
    var fullName = this.signUpForm.controls['fullName'];
    var email = this.signUpForm.controls['email'];
    // var eId = this.signUpForm.controls['eId'];
    // var userName = this.signUpForm.controls['userName'];


    var fieldArray = [firstName,lastName,fullName,email];

    let errorMsg = '';

    var errorMsgForRequired = this.validateFields(fieldArray);

    if(errorMsgForRequired !== null){
      this.showAlertMsg(errorMsgForRequired);
      return false;
    }

    if(!firstName.valid){

      if(firstName.errors['maxlength']){
        errorMsg = 'Max length for first name is 30.';
      }
      if(firstName.errors['pattern']){
        errorMsg = 'First name should contain only characters.';
      }
    }
    if(!lastName.valid){
      if(lastName.errors['maxlength']){
        errorMsg = 'Max length for last name is 30.';
      }
      if(lastName.errors['pattern']){
        errorMsg = 'Last name should contain only characters.';
      }
    }

    if(!fullName.valid){
      if(fullName.errors['maxlength']){
        errorMsg = 'Max length for full name is 60.';
      }
      if(fullName.errors['pattern']){
        errorMsg = 'Full name should contain only characters.';
      }
    }

    if(!email.valid){
      if(email.errors['emailValidationFail']){
        errorMsg = "invalid Email";
      }
    }

    this.showAlertMsg(errorMsg);

    return false;
  }

  validateFields(arr){

    let arrayLength = arr.length;
    let errorMsg = null;
    for(let i = 0;i<arrayLength;i++){
      if(!arr[i].valid){
        if(arr[i].errors['required']){
          errorMsg ='All field must be filled.';
          return errorMsg;
        }

        // if(arr[i].errors['maxlength']){
        //   errorMsg = 'Max len';
        //   return errorMsg;}
        // if(arr[i].errors['minlength']){
        //   errorMsg = 'madi';
        //   return errorMsg;
        // }
      }
    }
    return null;
  }

  showAlertMsg(data){
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: data,
      buttons: ['OK']
    });
    alert.present();
  }

  editFunc(){

    if (this.validate()) {

      var req = this.signUpForm.value;

      this.apiCtrl.httpPost(AppConfig.service_urls.USER_SIGNUP + '/update',req).then((data : any) => {


        if(data.nModified>0){
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Account Updated.!',
            buttons: ['OK']
          });
          alert.present();
          this.authResponse.logout();
        }else{
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'No changes detected.!',
            buttons: ['OK']
          });
          alert.present();
        }


        // this.navCtrl.setRoot(LoginPage);
      });

    }
  }


  ionViewDidLoad() {

  }

}
