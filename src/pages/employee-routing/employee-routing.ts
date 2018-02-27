import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddEmployeePage} from "../add-employee/add-employee";
import {AllEmployeesPage} from "../all-employees/all-employees";
// import {EditEmployeePage} from "../edit-employee/edit-employee";

/**
 * Generated class for the EmployeeRoutingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-employee-routing',
  templateUrl: 'employee-routing.html',
})
export class EmployeeRoutingPage {
  empViews : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.empViews = [
      {Name : "Add Employee" , Component : AddEmployeePage},
      {Name : "All Employee" , Component : AllEmployeesPage},
      // {Name : "View Employee" , Component : EditEmployeePage}
    ];
  }

  ViewPage(item){
    this.navCtrl.push(item.Component);
  }

}
