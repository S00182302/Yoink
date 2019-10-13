import { Component } from '@angular/core';
import { StoredataService } from '../services/storedata.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  id: string = '';
  constructor(private storageService: StoredataService) {
    this.storageService.getAuth().then(auth => {
      this.id = auth.id;
    });
  }
}
