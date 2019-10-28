import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
// import { PopoverComponent } from '../../component/popover/popover.component';

@Component({
  selector: 'app-post-popover',
  templateUrl: './post-popover.component.html',
  styleUrls: ['./post-popover.component.scss']
})
export class PostPopoverComponent implements OnInit {
  constructor(public popoverController: PopoverController) {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: '<ion-text>Popover</ion-text>',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  ngOnInit() {}
}
