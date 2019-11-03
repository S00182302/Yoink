import { Component, OnInit, NgModule } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  isCodeValid: boolean = false;
  message: string = "";
  forgotCode: string;
  form2 = new FormGroup({
    forgotEmail: new FormControl()
  });
  form = new FormGroup({
    first: new FormControl(),
    second: new FormControl(),
    third: new FormControl(),
    fourth: new FormControl(),
    fifth: new FormControl()
  });

  constructor(private yoinkService: YoinkService) {
    this.first.valueChanges.subscribe(
      (value: string) => {
        console.log('first value changed to:', value);
    });
    this.second.valueChanges.subscribe(
      (value: string) => {
        console.log('second value changed to:', value);
    });
    this.third.valueChanges.subscribe(
      (value: string) => {
        console.log('third value changed to:', value);
    });
    this.fourth.valueChanges.subscribe(
      (value: string) => {
        console.log('fourth value changed to:', value);
    });
    this.fifth.valueChanges.subscribe(
      (value: string) => {
        console.log('fifth value changed to:', value);
    });
  }

  validateCode(userCode: string) {
    if(userCode === this.forgotCode){
      this.isCodeValid = true;
    }else{
      this.isCodeValid = false;
    }
  }

  onSubmit() {
    this.yoinkService.forgot(this.forgotEmail).subscribe(
      async res => {
        this.forgotCode = res['resetCode'];
        this.message = "Please check your email for your reset code."
      },
      err => {
        // TODO change this to output error message to user
        this.message = err.error.message;
        return console.log(err.error.message);
      }
    );
    
  }

  ngOnInit() {
  }

  get forgotEmail () { return this.form2.get('forgotEmail')}
  get first () { return this.form.get('first')}
  get second () { return this.form.get('second')}
  get third () { return this.form.get('third')}
  get fourth () { return this.form.get('fourth')}
  get fifth () { return this.form.get('fifth')}
}
