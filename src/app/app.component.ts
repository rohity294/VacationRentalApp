import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';

import { AppVersion } from '@ionic-native/app-version/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private appVersion: AppVersion,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // console.log("hi....");
      // this.appVersion.getVersionCode().then((resData)=>{
      //   alert("Device's App Version Code:"+resData);
      // },(error)=>{
      //   alert(JSON.stringify(error));
      // });
    });
    this.translate.setDefaultLang('en');
  }

  onLogout(){
    console.log("logged out");
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
