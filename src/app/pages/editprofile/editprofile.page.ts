import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss']
})
export class EditprofilePage implements OnInit {
  @Input() id: string;
  token: string;
  user: any;
  email: string = '';
  gender: string = 'Male';

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private navParams: NavParams,
    private yoinkService: YoinkService,
    private storageService: StoredataService
  ) {
    console.log(navParams.get('id'));
  }
  getAuth = async () => {
    await this.storageService.getAuth().then(auth => {
      this.token = auth.token;
    });
  };

  getUser = async () => {
    await this.yoinkService
      .getSingleUser(this.id, this.token)
      .subscribe(user => {
        this.user = user;
        console.log(this.user);
      });
  };

  dismiss = () => {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  };

  ngOnInit() {
    this.getAuth();
    this.getUser();
  }
}
