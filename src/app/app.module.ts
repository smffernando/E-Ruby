import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FormPage} from "../pages/form/form";
import { ApiProvider } from '../providers/api/api';
import {HttpClientModule} from "@angular/common/http";
import {ViewPage} from "../pages/view/view";
import {LoginPage} from "../pages/login/login";
import { AuthResponseProvider } from '../providers/auth-response/auth-response';
import {AddEmployeePage} from "../pages/add-employee/add-employee";
import {AllEmployeesPage} from "../pages/all-employees/all-employees";
import {EditEmployeePage} from "../pages/edit-employee/edit-employee";
import {FormsModule} from "@angular/forms";
import {EmployeeRoutingPage} from "../pages/employee-routing/employee-routing";
import {SearchPage} from "../pages/search/search";
import {ConfirmedRequestPage} from "../pages/confirmed-request/confirmed-request";
import {SendRequestHomePage} from "../pages/send-request-home/send-request-home";
import {ViewProjectPage} from "../pages/confirmed-request/view-project/view-project";
import {AddEmployeeToRequestPage} from "../pages/confirmed-request/add-employee-to-request/add-employee-to-request";
import {SignupPage} from "../pages/signup/signup";
import {AllUsersPage} from "../pages/all-users/all-users";
import {ViewUserDetailsPage} from "../pages/view-user-details/view-user-details";
import {RoleAssignPage} from "../pages/role-assign/role-assign";
import {AllAccepterRequestsPage} from "../pages/all-accepter-requests/all-accepter-requests";
import {ViewAcceptedRequestPage} from "../pages/all-accepter-requests/view-accepted-request/view-accepted-request";



@NgModule({
  declarations: [

    MyApp,
    HomePage,
    FormPage,
    ViewPage,
    LoginPage,
    AddEmployeePage,
    AllEmployeesPage,
    EditEmployeePage,
    EmployeeRoutingPage,
    SearchPage,
    ConfirmedRequestPage,
    SendRequestHomePage,
    ViewProjectPage,
    AddEmployeeToRequestPage,
    SignupPage,
    AllUsersPage,
    ViewUserDetailsPage,
    RoleAssignPage,
    AllAccepterRequestsPage,
    ViewAcceptedRequestPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormPage,
    ViewPage,
    LoginPage,
    AddEmployeePage,
    AllEmployeesPage,
    EditEmployeePage,
    EmployeeRoutingPage,
    SearchPage,
    ConfirmedRequestPage,
    SendRequestHomePage,
    ViewProjectPage,
    AddEmployeeToRequestPage,
    SignupPage,
    AllUsersPage,
    ViewUserDetailsPage,
    RoleAssignPage,
    AllAccepterRequestsPage,
    ViewAcceptedRequestPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    AuthResponseProvider
  ]
})
export class AppModule {}
