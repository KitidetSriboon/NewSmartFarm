import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  encryptInfo;
  checkdata:any;
  username:any;
  password:any;
  supcode:any;
  supname;
  alldata: any;
  form: FormGroup;
  public data: any;
  constructor(private router: Router, private spinner: NgxSpinnerService) {
    this.form = new FormGroup({
      test: new FormControl(),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {

  }
  
  Loaddata() {
    this.spinner.show();
    var userinfor = (<HTMLInputElement>document.getElementById('username')).value;
    // console.log(userinfor);
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/dbcps/get_users?username=' + userinfor;
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        this.supname = out.recordset[0].supname;
        this.username = out.recordset[0].username;
        this.password = out.recordset[0].password;
        this.supcode = out.recordset[0].supcode;
        // console.log('DATA From SQL:.=>', data);   
        this.alldata = data;
        return this.alldata;
      })
      .catch(err => { throw err });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  OnLogin(): void {


    let username = this.form.get('username').value;
    let password = this.form.get('password').value;
    this.data = { username: this.supname, password: this.password, code: this.supcode, alldata: this.alldata }

    if (username === '' || password === '') { alert('กรุณากรอกข้อมูลให้ครบทุกช่อง !!!'); }
    else if (username != this.username || password != this.password) { alert('!!!!  ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่ !!! '); }
    else if (username === this.username && password === this.password) {

      this.encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(this.data), 'bsfdev').toString());

      // console.log("encryptInfo");
      // console.log(this.encryptInfo);
      // console.log(encrypted);
      localStorage.setItem('userdata', this.encryptInfo);
      this.router.navigateByUrl("/supporter", { state: this.data });
    }
    

}

}
