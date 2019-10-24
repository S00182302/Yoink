import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { OpenfoodfactsService } from 'src/app/services/openfoodfacts.service';

@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrls: ['./barcodescanner.component.scss']
})
export class BarcodescannerComponent implements OnInit {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private openFoodDataService: OpenfoodfactsService
  ) {}
  barcode: string = '';

  openBarcodeScanner = () => {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log('Barcode data', barcodeData);
        this.barcode = barcodeData.text;
        this.getFoodData();
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  getFoodData = () => {
    this.openFoodDataService
      .getData(this.barcode)
      .subscribe(data => console.log('The food data is:', data));
  };

  ngOnInit() {}
}
