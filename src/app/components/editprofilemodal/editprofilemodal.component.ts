import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditprofilePage } from '../../pages/editprofile/editprofile.page';

@Component({
  selector: 'app-editprofilemodal',
  templateUrl: './editprofilemodal.component.html',
  styleUrls: ['./editprofilemodal.component.scss']
})
export class EditprofilemodalComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  presentModal = async () => {
    const modal = await this.modalController.create({
      component: EditprofilePage
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

  ngOnInit() {}
}
