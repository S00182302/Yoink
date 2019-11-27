import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  constructor(private modal: ModalController) {}
  priceRange: number = 0;
  price: number;
  maxPrice: number;
  minPrice: number;
  customSteps: any;
  selectedCounty: string;
  selectedCategory: string;
  onChangeLocation(changedLocation) {
    this.selectedCounty = changedLocation;
    console.log('location Changed to : ', this.selectedCounty);
  }
  onChangeCategory(changedCat) {
    this.selectedCategory = changedCat;
    console.log('cat changed to', this.selectedCategory);
  }

  counties: string[] = [
    'All Counties',
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
  categoryAndSubCats: string[] = [
    'All',
    'Food',
    'Electronics',
    'Sport and hobbies',
    'House and DIY',
    'Farming',
    'Music and education',
    'Holidays and tickets',
    'Animals',
    'Clothes and lifestyle',
    'Baby and kids'
  ];
  electronicsSubs: string[] = [
    'Phones',
    'Laptops',
    'Games and Consoles',
    'PCs',
    'Screens',
    'Home Audio',
    'Tablets',
    'Printers',
    'Cameras',
    'MP3 Players',
    'Accessories',
    'DVD and BlueRay',
    'CamCorders',
    'Other Electronics'
  ];

  categories: any[] = [
    'All',
    'Food',
    'Electronics',
    'Sport and hobbies',
    'House and DIY',
    'Farming',
    'Music and education',
    'Holidays and tickets',
    'Animals',
    'Clothes and lifestyle',
    'Baby and kids'
  ];
  subCategories: string[] = [''];

  closeModal() {
    this.modal.dismiss();
  }
  ngOnInit() {}
}
