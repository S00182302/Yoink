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
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { PostPopoverContentComponent } from './components/post-popover-content/post-popover-content.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [PostComponent, PostPopoverContentComponent],
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
    FilePath,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
