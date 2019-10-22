import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrls: ['./barcodescanner.component.scss']
})
export class BarcodescannerComponent implements OnInit {
  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log('Barcode data', barcodeData);
      })
      .catch(err => {
        console.log('Error', err);
      });
  }
}
