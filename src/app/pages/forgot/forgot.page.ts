import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  isCodeValid: boolean = false;
  invalidEmail: boolean = false;
  @ViewChild('second', {static:false}) sec;
  @ViewChild('third', {static:false}) thi;
  @ViewChild('fourth', {static:false}) fou;
  @ViewChild('fifth', {static:false}) fif;

  message: string = "";
  forgotCode: string;
  form2 = new FormGroup({
    forgotEmail: new FormControl('', [Validators.required])
  });
  form = new FormGroup({
    first: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[a-z,A-Z,0-9]*')]),
    second: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[a-z,A-Z,0-9]*')]),
    third: new FormControl(),
    fourth: new FormControl(),
    fifth: new FormControl()
  });

  constructor(private yoinkService: YoinkService, private el: ElementRef) {
    this.first.valueChanges.subscribe(
      (value: string) => {
        if(value.length > 1){
          value = value[value.length - 1];
          this.first.setValue(value);
        }
        console.log('first value changed to:', this.first.value);
        this.sec.setFocus();
    });
    this.second.valueChanges.subscribe(
      (value: string) => {
        if(value.length > 1){
          value = value[value.length - 1];
          this.second.setValue(value);
        }
        console.log('second value changed to:', value);
        this.thi.setFocus();
    });
    this.third.valueChanges.subscribe(
      (value: string) => {
        if(value.length > 1){
          value = value[value.length - 1];
          this.third.setValue(value);
        }
        console.log('third value changed to:', value);
        this.fou.setFocus();
    });
    this.fourth.valueChanges.subscribe(
      (value: string) => {
        if(value.length > 1){
          value = value[value.length - 1];
          this.fourth.setValue(value);
        }
        console.log('fourth value changed to:', value);
        this.fif.setFocus();
    });
    this.fifth.valueChanges.subscribe(
      (value: string) => {
        if(value.length > 1){
          value = value[value.length - 1];
          this.fifth.setValue(value);
        }
        console.log('fifth value changed to:', value);
    });
  }

  validateCode(userCode: string) {
    if(userCode === this.forgotCode){
      return true;
    }else{
      return false;
    }
  }

  setFocus(){
    return false;
  }

  onSubmit= async () => {
    let userEmail = this.forgotEmail.value;
    console.log(userEmail);
    if(userEmail == null || userEmail == undefined || userEmail == ""){
      // email is not valid
      this.message = "Please check your email for your reset code."
      console.log("Not valid");
    }
    else
    {
      this.yoinkService.forgot(userEmail).subscribe(
        async res => {
          this.forgotCode = res['resetCode'];
          this.message = "Please check your email for your reset code."
          console.log(this.forgotCode);
        },
        err => {
          // TODO change this to output error message to user
          this.message = err.message;
          if(err.status == 401){
            this.invalidEmail = true;
            this.message = "The email provided did not match out records.";
          }
          return console.log("error code " + err.status + " " + this.message);
        }
      );
    }
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
