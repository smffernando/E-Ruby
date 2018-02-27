import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AppConfig} from '../../config/app.config';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  search : any = {byProjectName : null, byDate : {from : null , to : null} , bySkills : []}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  SearchProject(){
    console.log(this.search);
    console.log(AppConfig.service_urls.SEARCH_PROJECT_URL);
    // this.apiCtrl.httpPost(AppConfig.service_urls.SEARCH_PROJECT_URL,value).then(data => {
    //
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
