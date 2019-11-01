import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StoredataService } from './services/storedata.service';

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
    private router: Router,
    private screenOrientation: ScreenOrientation,
    private localStorage: StoredataService
  ) {
    this.initializeApp();

    // LOCK ORIENTATION
    this.screenOrientation
      .lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      .catch(error => {
        console.log(error);
      });
  }

  logout = () => {
    try {
      this.router.navigate(['/login']);
      this.localStorage.clearAuth().then(
        result => {
          console.log('Auth Removed');
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
