import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  FilterSection = false;
  searchbar = false;
  counties: string[] = [
    'Antrim,',
    'Armagh',
    'Carlow',
    'Cavan',
    'Clare',
    'Cork',
    'Derry',
    'Donegal',
    'Down',
    'Dublin',
    'Fermanagh',
    'Galway',
    'Kerry',
    'Kildare',
    'Kilkenny',
    'Laois',
    'Leitrim',
    'Limerick',
    'Longford',
    'Louth',
    'Mayo',
    'Meath',
    'Monaghan',
    'Offaly',
    'Roscommon',
    'Sligo',
    'Tipperary',
    'Tyrone',
    'Waterford',
    'Westmeath',
    'Wexford',
    'Wicklow'
  ];
  constructor() {}
  showSearch() {
    this.searchbar = true;
    this.hideFilterSection();
  }
  hideSearch() {
    this.searchbar = false;
  }
  // to apply the filter options
  applyFilters() {}

  showFilterSection() {
    // tslint:disable-next-line: no-conditional-assignment

    this.hideSearch();
    this.FilterSection = true;
  }
  hideFilterSection() {
    this.FilterSection = false;
  }
}
