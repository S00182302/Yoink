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

  logout = async () => {
    try {
      await this.localStorage.clearAuth().then(
        result => {
          console.log('Auth Removed');
        },
        error => {
          console.log(error);
        }
      );

      await this.localStorage.clearEverything();

      this.router.navigate(['/login']);
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
