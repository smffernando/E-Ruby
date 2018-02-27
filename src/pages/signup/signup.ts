import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AppConfig} from "../../config/app.config";
import {LoginPage} from "../login/login";
import {Validators, FormBuilder ,FormGroup } from '@angular/forms';
import {EmailValidator} from "../../form-validators/emailValidator";
import {confirmPasswordChecker} from "../../form-validators/confirmPasswordChecker";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signUp : any = {};
  private signUpForm : FormGroup;

  constructor(public formBuilder: FormBuilder , public navCtrl: NavController, public navParams: NavParams , public apiCtrl : ApiProvider , public alertCtrl: AlertController) {

    this.signUpForm = this.formBuilder.group({
    firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    fullName: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    eId: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
    userName: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    cPassword: ['', Validators.compose([Validators.required, confirmPasswordChecker.isValid])]
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
    var eId = this.signUpForm.controls['eId'];
    var userName = this.signUpForm.controls['userName'];
    var password = this.signUpForm.controls['password'];
    var cPassword = this.signUpForm.controls['cPassword'];

    var fieldArray = [firstName,lastName,fullName,email,eId,userName,password,cPassword];

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

    if(!eId.valid){
      if(eId.errors['maxlength']){
        errorMsg = 'Max length for employee ID is 10.';
      }
    }

    if(!email.valid){
      if(email.errors['emailValidationFail']){
        errorMsg = "invalid Email";
      }
    }

    if(!userName.valid){
      if(userName.errors['maxlength']){
        errorMsg = 'Max length for user name is 30.';
      }
    }

    if(!password.valid){
      if(password.errors['maxlength']){
        errorMsg = 'Max length for password is 30.';
      }
    }

    if(!cPassword.valid){
      if(cPassword.errors.mismatched){
        errorMsg = 'Password mismatch.';
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

         if(arr[i].errors['maxlength']){
           errorMsg = 'Max len';
           return errorMsg;}
         if(arr[i].errors['minlength']){
           errorMsg = 'madi';
           return errorMsg;
         }
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

  submitFunc(){

    if (this.validate()) {

      var req = this.signUpForm.value;

      delete req['cPassword'];
      req.roleId = AppConfig.user_roles.INITIAL_SIGN_UP_ROLE;

      this.apiCtrl.httpPost(AppConfig.service_urls.USER_SIGNUP,req).then((data : any) => {

          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Account Created.!',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(LoginPage);
      });

    }

  }

  ionViewDidLoad() {}

}

