import { Component } from '@angular/core';
import {AuthResponseProvider} from "../../providers/auth-response/auth-response";
import {SignupPage} from "../signup/signup";
import {NavController , AlertController} from "ionic-angular";
import {Validators, FormBuilder ,FormGroup } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login : any = {};
  private loginForm : FormGroup;
 

  constructor(public formBuilder: FormBuilder ,public navCtrl: NavController , public authResponse : AuthResponseProvider , public alertCtrl: AlertController) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    });
  }

  ionViewDidLoad() {
    this.login  = {
      userName : "",
      password : ""
    }
  }

  validate(): boolean {

    if (this.loginForm.valid) {
      return true;
    }

    let errorMsg = '';

    var userName  = this.loginForm.controls['userName'];
    var password = this.loginForm.controls['password'];

   if(!password.valid){
      this.login.password = "";
      if(password.errors['maxlength']){
         errorMsg = 'Max length for password is 30.';
       }
      if(password.errors['required']){
        errorMsg = 'Password cannot be empty.';
       }
    }

    if(!userName.valid){

      this.login.userName = "";
      
      if(userName.errors['maxlength']){
        errorMsg = 'Max length for user name is 30.';
      }
      if(userName.errors['required']){
        errorMsg = 'User name cannot be empty.';
      }
    }
    
this.showAlertMsg(errorMsg);
return false;
}

  addFormData(){

    if(this.validate()){
      this.authResponse.login(this.loginForm.value);
      this.login.userName = "";
      this.login.password = "";
    }
    
  }

  onSignUp(){
    this.navCtrl.push(SignupPage);
  }

  showAlertMsg(data){
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: data,
      buttons: ['OK']
    });
    alert.present();
  }

}
