import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PostPopoverContentComponent } from '../../components/post-popover-content/post-popover-content.component';

@Component({
  selector: 'app-post-popover',
  templateUrl: './post-popover.component.html',
  styleUrls: ['./post-popover.component.scss']
})
export class PostPopoverComponent implements OnInit {
  constructor(public popoverController: PopoverController) {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PostPopoverContentComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  ngOnInit() {}
}
