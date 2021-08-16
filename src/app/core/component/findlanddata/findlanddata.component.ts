import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-findlanddata',
  templateUrl: './findlanddata.component.html',
  styleUrls: ['./findlanddata.component.css']
})
export class FindlanddataComponent implements OnInit {
  // Valiable //
  d6465 = true;
  d6463 = false;
  d6362 = false;
  data6465;
  data6364;
  data6263;
  farmmerdatalist;
  FormCode:FormGroup;
  constructor(private spinner: NgxSpinnerService) {
    this.FormCode = new FormGroup({
      farmmercode: new FormControl(),
      farmmertext: new FormControl(),
    });
   }
 
  ngOnInit(): void {
  }
  check(x) {

    if (x == 1) {
      this.d6465 = true;
      this.d6463 = false;
      this.d6362 = false;
      document.getElementById("6465").style.display = "block";
      document.getElementById("6364").style.display = "none";
      document.getElementById("6263").style.display = "none";
    }
    else if (x == 2) {
      this.d6463 = true;
      this.d6465 = false;
      this.d6362 = false;
      document.getElementById("6465").style.display = "none";
      document.getElementById("6364").style.display = "block";
      document.getElementById("6263").style.display = "none";
    }
    else if (x == 3) {
      this.d6465 = false;
      this.d6463 = false;
      this.d6362 = true;
      document.getElementById("6465").style.display = "none";
      document.getElementById("6364").style.display = "none";
      document.getElementById("6263").style.display = "block";
    }
  }

  getfarmmerdata(){
    let text = this.FormCode.get('farmmertext').value;
    let fmdata = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/fmsearch?fmname='+text+'';
    this.spinner.show();
    fetch(fmdata)
      .then(res => res.json())
      .then((out : any) => {
        const data = out.recordsets[0]; 
          // alert(a); 
        // console.log('DATA From SQL:.=>', data);     
        this.farmmerdatalist = data;
        return this.farmmerdatalist;
      })
      .catch(err => { throw err });
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  OnFinddata(){
    let key = this.FormCode.get('farmmercode').value;
    let url6465 = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/cp6465?fmcode='+key+'';
    let url6364 = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/cp6364?fmcode='+key+'';
    let url6263 = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/cp6263?fmcode='+key+'';
    this.spinner.show();
    fetch(url6465)
      .then(res => res.json())
      .then((out : any) => {
        const data = out.recordsets[0]; 
          // alert(a); 
        // console.log('DATA From SQL:.=>', data);     
        this.data6465 = data;
        return this.data6465;
      })
      .catch(err => { throw err });

      fetch(url6364)
      .then(res => res.json())
      .then((out : any) => {
        const data = out.recordsets[0]; 
          // alert(a); 
        // console.log('DATA From SQL:.=>', data);     
        this.data6364 = data;
      })
      .catch(err => { throw err });

      fetch(url6263)
      .then(res => res.json())
      .then((out : any) => {
        const data = out.recordsets[0]; 
          // alert(a); 
        // console.log('DATA From SQL:.=>', data);     
        this.data6263 = data;
      })
      .catch(err => { throw err });

     
        this.spinner.hide();
  }

}
