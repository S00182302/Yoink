import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditprofilePage } from '../../pages/editprofile/editprofile.page';
import { StoredataService } from 'src/app/services/storedata.service';

@Component({
  selector: 'app-editprofilemodal',
  templateUrl: './editprofilemodal.component.html',
  styleUrls: ['./editprofilemodal.component.scss']
})
export class EditprofilemodalComponent implements OnInit {
  id: string;

  constructor(
    public modalController: ModalController,
    private storageService: StoredataService
  ) {}

  getAuth = () => {
    this.storageService.getAuth().then(auth => {
      console.log(auth.id);
      this.id = auth.id;
    });
  };

  presentModal = async () => {
    const modal = await this.modalController.create({
      component: EditprofilePage,
      componentProps: {
        id: this.id
      }
    });
    return await modal.present();
  };

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {
    this.getAuth();
  }
}
