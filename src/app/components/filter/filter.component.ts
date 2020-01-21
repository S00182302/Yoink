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
  isShow = true;
  subCategory: string;
  subCategories: string[];
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
    this.changeSubCat(this.selectedCategory);
    this.toggleSubCat(this.selectedCategory);
  }
  changeSubCat(selectedCategory: string) {
    switch (selectedCategory) {
      case 'All': {
        this.subCategories = null;
        break;
      }
      case 'Food': {
        this.subCategories = this.foodSubs;
        break;
      }
      case 'Electronics': {
        this.subCategories = this.electronicsSubs;
        break;
      }
      case 'Sport and hobbies': {
        this.subCategories = this.sportAndHobbiesSubs;
        break;
      }
      case 'House and DIY': {
        this.subCategories = this.houseAndDiySubs;
        break;
      }
      case 'Farming': {
        this.subCategories = this.farminSubs;
        break;
      }
      case 'Music and education': {
        this.subCategories = this.musicAndEducationSubs;
        break;
      }
      case 'Holidays and tickets': {
        this.subCategories = this.holidaysAndTicketsSubs;
        break;
      }
      case 'Animals': {
        this.subCategories = this.animalsSubs;
        break;
      }
      case 'Clothes and lifestyle': {
        this.subCategories = this.clothesAndLifestyleSubs;
        break;
      }
      case 'Baby and kids': {
        this.subCategories = this.babyAndKidsSubs;
        break;
        
      }
      default: {
        //statements;
        break;
      }
    }
  }
  toggleSubCat(selectedCategory: string) {
    if (selectedCategory != null) {
      this.isShow = !this.isShow;
      console.log('toggleSubCat', selectedCategory);
    }
  }
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
  sportAndHobbiesSubs: string[] = [
    'Field Sports',
    'Gym Equiptment',
    'Cycling',
    'Water Sports',
    'Camping',
    'Sailing and Fishing',
    'Golf',
    'Equestrian',
    'Racket and Indoor Sports',
    'Snooker and Pool',
    'Hobbies',
    'Other Sports'
  ];
  houseAndDiySubs: string[] = [
    'Furniture and Interiors',
    'Garden and Landscaping',
    'Home Improvements and DIY',
    'Antiques and Collectibles'
  ];
  farminSubs: string[] = [
    'Tractors',
    'Livestock',
    'Tractors',
    'Livestock',
    'Farm Machinery',
    'Bedding and Feed',
    'Farmers Market',
    'Farmers Noticeboard',
    'Farm Services',
    'Farm Sheds',
    'Farm Tools',
    'Feeding Equipment',
    'Fencing Equipment',
    'Other Farming',
    'Poultry',
    'Vintage Machinery'
  ];
  musicAndEducationSubs: string[] = ['Music', 'Instruments', 'Education'];
  holidaysAndTicketsSubs: string[] = [
    'Hotels and BNBs',
    'Irish Holiday',
    'Overseas Holiday',
    'Travel Tickes',
    'Sport Tickets',
    'Music Tickets',
    'Other Tickets'
  ];
  animalsSubs: string[] = [
    'Dogs',
    'Cats',
    'Equine',
    'Birds',
    'Reptiles',
    'Small Furries',
    'Pet accessories',
    'Other Pets'
  ];
  clothesAndLifestyleSubs: string[] = [
    'Mens Clothing',
    'Ladies Cothing',
    'Kids Clothing',
    'Wedding',
    'Heath and Beauty'
  ];
  babyAndKidsSubs: string[] = [
    'Car Seats',
    'Buggies',
    'Bath Time',
    'Babywear',
    'Toys',
    'Safety Equipment',
    'Nursery',
    'Feeding time',
    'Other Mother and Baby'
  ];
  foodSubs: string[] = ['All', 'Groceries', 'Resturants'];

  closeModal() {
    this.modal.dismiss();
  }

  ngOnInit() {}
}
