import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { EditprofilePageModule } from './pages/editprofile/editprofile.module';
import { PostComponent } from './components/post/post.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [PostComponent, PopoverComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot({
      scrollAssist: true
    }),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    EditprofilePageModule,
    ComponentsModule,
    CommonModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    FormsModule,
    ReactiveFormsModule,
    BarcodeScanner,
    Camera,
    WebView,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
