import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { OpenfoodfactsService } from 'src/app/services/openfoodfacts.service';

@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrls: ['./barcodescanner.component.scss']
})
export class BarcodescannerComponent implements OnInit {
  dataFound: Boolean;
  product: any;
  @Output() outProduct: EventEmitter<any> = new EventEmitter();

  constructor(
    private _barcodeScanner: BarcodeScanner,
    private _openFoodService: OpenfoodfactsService
  ) {}

  openBarcodeScanner(): void {
    this._barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log('BARCODE IS -->', barcodeData.text);
        this.getFoodData(barcodeData.text);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }

  getFoodData(barcode: string): void {
    this._openFoodService.getData(barcode).subscribe(data => {
      if (!data || data['status_verbose'] === 'product not found') {
        console.log('NO DATA FOUND');
        this.dataFound = false;
      } else {
        console.log('DATA FOUND');

        this.product = this.extractImportantOpenFoodFactsData(data);

        console.log(this.product);

        if (!this.product) {
          // Using NGRX (Angular state management) would be preferable, what do ye think?
          // Rather than passing data between components, is harder to maintain.
          this.emitProduct();
        }
      }
    });
  }

  // Because we will be using more than one api for barcode data.
  // All API data attributes will differ and we need to cater for each.
  extractImportantOpenFoodFactsData(data: any): any {
    const importantData = {
      name: data['product'].product_name,
      imageUrl: data['product'].image_ingredients_thumb_url,
      categories: data['product'].categories,
      type: data['product'].pnns_groups_2,
      productId: data['product'].id
    };

    return importantData;
  }

  emitProduct(): void {
    this.outProduct.emit(this.product);
  }

  ngOnInit() {}
}
