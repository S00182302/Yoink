import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  constructor(private filter: ModalController) {
    this.watchRange();
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

  priceRange: number = 0;
  price: number;
  maxPrice: number;
  minPrice: number;
  customSteps: any;
  rangeArray: any[] = [200, 2000, 2500, 5000, 10000];
  selectedCounty: string;
  selectedCategory: string;
  onChangeLocation(changedLocation) {
    this.selectedCounty = changedLocation;
    console.log('location Changed to : ', this.selectedCounty);
  }
  onChangeCategory(changedCat) {
    this.selectedCategory = changedCat;
    this.watchRange();
    console.log('cat changed to', this.selectedCategory);
  }
  async watchRange() {
    switch (this.selectedCategory) {
      case 'All':
        this.maxPrice = 10000;
        break;
      case 'Food':
        this.maxPrice = 200;
        break;
      case 'Electronics':
      case 'Sport and hobbies':
      case 'House and DIY':
        this.maxPrice = 2500;
        break;
      case 'Farming':
      case 'Holidays and tickets':
        this.maxPrice = 5000;
        break;
      case 'Music and education':
      case 'Clothes and lifestyle':
      case 'Baby and kids':
      case 'Animals':
        this.maxPrice = 2500;
      default:
        this.maxPrice = 10000;
        break;
    }

    await console.log(this.maxPrice);
  }

  closeModal() {
    this.filter.dismiss();
  }
  ngOnInit() {}
}
