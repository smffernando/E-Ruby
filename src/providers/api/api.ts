import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController} from "ionic-angular";
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient ,public alertCtrl: AlertController , public loadingCtrl: LoadingController) {  }

  loader : any;

  httpGet(url) {

    this.loadLoader();

    return new Promise(resolve => {
      this.http.get(url).subscribe(data => {

        this.dismissLoader();
        resolve(data);

      }, err => {

        this.dismissLoader();
        console.log(err);
        if(err.status == 0){
          this.showAlert("Connection error.Please check your internet Connection.");
        }else{
          this.showAlert(err.url +' ' + err.statusText);
        }
      });
    });
  }

  httpPost(url,body) {

    this.loadLoader();

    return new Promise(resolve => {
      this.http.post(url,body).subscribe(data => {

        this.dismissLoader();
        resolve(data);
      }, err => {

        this.dismissLoader();
        console.log(err);
        if(err.status == 0){
          this.showAlert("Connection error.Please check your internet Connection.");
        }else{
          this.showAlert(err.url +' ' + err.statusText);
        }
      });
    });
  }

  httpPut(url,body) {

    this.loadLoader();

    return new Promise(resolve => {
      this.http.put(url,body).subscribe(data => {
       
        this.dismissLoader();
        resolve(data);
      }, err => {

        this.dismissLoader();
        console.log(err);
        if(err.status == 0){
          this.showAlert("Connection error.Please check your internet Connection.");
        }else{
          this.showAlert(err.url +' ' + err.statusText);
        }
        
      });
    });
  }

  showAlert(msg){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  loadLoader(){
    this.loader = this.loadingCtrl.create({
       content: 'Please wait...'
     });
     this.loader.present();
   }
 
   dismissLoader(){
     this.loader.dismiss();
   }
 
}
