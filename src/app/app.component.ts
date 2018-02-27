import {Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events} from 'ionic-angular';
import {StatusBar } from '@ionic-native/status-bar';
import {SplashScreen } from '@ionic-native/splash-screen';
import {HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {EmployeeRoutingPage} from "../pages/employee-routing/employee-routing";
// import {SearchPage} from "../pages/search/search";
import {ConfirmedRequestPage} from "../pages/confirmed-request/confirmed-request";
import {SendRequestHomePage} from "../pages/send-request-home/send-request-home";
import {AuthResponseProvider} from "../providers/auth-response/auth-response";
import {AppConfig} from "../config/app.config";
import {AllUsersPage} from "../pages/all-users/all-users";
import {AllAccepterRequestsPage} from "../pages/all-accepter-requests/all-accepter-requests";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen ,
              public events: Events , public auth : AuthResponseProvider) {

    events.subscribe('user:login', () => {
      this.loggedIn();
    });

    events.subscribe('user:loggedOut', () => {
      this.loggedOut();
    });

    this.initializeApp();

  }

  loggedIn(){

    let loginData = this.auth.getLoginResponse();

    if(loginData.roleId == AppConfig.user_roles.ADMIN){

      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'All Users', component: AllUsersPage },
        { title: 'Employee', component: EmployeeRoutingPage },
        { title: 'Send Request', component: SendRequestHomePage},
        // { title: 'Search', component: SearchPage },
        { title: 'Confirmed Requests', component: ConfirmedRequestPage },
        { title: 'Accepted Requests', component: AllAccepterRequestsPage }
      ];

    }else if(loginData.roleId == AppConfig.user_roles.PM){
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Send Request', component: SendRequestHomePage},
        { title: 'Accepted Requests', component: AllAccepterRequestsPage }
      ];
    }else if(loginData.roleId == AppConfig.user_roles.RM){
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Employee', component: EmployeeRoutingPage },
        { title: 'Confirmed Requests', component: ConfirmedRequestPage }
      ];
    }else{
      this.pages = [
        { title: 'Home', component: HomePage }
      ]
    }

    this.rootPage = HomePage;
  }

  loggedOut(){
    this.rootPage = LoginPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
