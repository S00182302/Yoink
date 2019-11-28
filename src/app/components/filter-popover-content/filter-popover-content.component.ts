import { Component, OnInit } from '@angular/core';
import { PlaceLocation } from 'src/app/models/location.model';

@Component({
  selector: 'app-filter-popover-content',
  templateUrl: './filter-popover-content.component.html',
  styleUrls: ['./filter-popover-content.component.scss']
})
export class FilterPopoverContentComponent implements OnInit {
  constructor() {}

  onLocationPicked(location: PlaceLocation) {
    // this.form.patchValue({ location: location });
  }

  ngOnInit() {}
}
