import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { OpenfoodfactsService } from 'src/app/services/openfoodfacts.service';

@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrls: ['./barcodescanner.component.scss']
})
export class BarcodescannerComponent implements OnInit {
  data: any;
  dataFound: Boolean;
  product: any;
  @Output() outProduct: EventEmitter<any> = new EventEmitter();

  constructor(
    private barcodeScanner: BarcodeScanner,
    private openFoodService: OpenfoodfactsService
  ) {}

  emitProduct = () => {
    this.outProduct.emit(this.product);
  };

  getFoodData = barcode => {
    this.openFoodService.getData(barcode).subscribe(data => {
      this.data = data;

      const scannedProduct = {
        name: data['product'].product_name,
        imageUrl: data['product'].image_ingredients_thumb_url,
        categories: data['product'].categories,
        type: data['product'].pnns_groups_2,
        productId: data['product'].id
      };

      this.product = scannedProduct;
      console.log(scannedProduct);
      this.emitProduct();

      if (this.data.status_verbose === 'product not found') {
        this.dataFound = false;
        console.log('product not found !');
        // TODO add that item to our database
      }
    });
  };

  openBarcodeScanner = () => {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log('Barcode is:', barcodeData.text);
        this.getFoodData(barcodeData.text);
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  ngOnInit() {}
}
