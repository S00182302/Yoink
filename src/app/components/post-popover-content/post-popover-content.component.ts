import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-post-popover-content',
  templateUrl: './post-popover-content.component.html',
  styleUrls: ['./post-popover-content.component.scss']
})
export class PostPopoverContentComponent implements OnInit {
  currentPopover: any;
  constructor(private popoverController: PopoverController) {}

  async dismissPopover() {
    await this.popoverController.dismiss();
  }

  ngOnInit() {}
}
