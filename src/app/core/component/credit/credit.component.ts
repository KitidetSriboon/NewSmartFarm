import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  @ViewChild(MatSort) sort: MatSort;
  
  FormFirst:FormGroup;
  FormCredit: FormGroup;
  constructor() { 
    this.FormFirst = new FormGroup({
      idcard:new FormControl(),
      birthdaydate:new FormControl(),
      fullname : new FormControl(),
      birthday:new FormControl(),
    })

    this.FormCredit = new FormGroup({
      fmcodeperson1:new FormControl(),
      fmnameperson1:new FormControl(),
      fmcodeperson2:new FormControl(),
      fmnameperson2:new FormControl(),
      fmcodeperson3:new FormControl(),
      fmnameperson3:new FormControl(),
     
      fmnameorcode:new FormControl(),
    })
  }
  displayfarmaer:string[]=['fmcode','fmname','zone','cane'];
  
  zone;decryptedInfo;
  ngOnInit(): void {
    let data = localStorage.getItem('userdata');
    var deData = CryptoJS.AES.decrypt(decodeURIComponent(data), 'bsfdev');
    this.decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    this.zone = this.decryptedInfo.alldata[0].zonedata;
    this.Loaddatacontact();
    this.Loadtendata();
  
  }

  Farmerdata;
  ngAfterViewInit() {
   
   
    this.Farmerdata.paginator = this.paginator;
    this.Farmerdata.sort = this.sort;
    
  }

  //  Getalldata
  Alldatafamerbyzone;
  Selectfarmer;
  Loaddatacontact(){
    let url ="https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_credit_farmerBysupzone?supzone="+this.zone;
    axios.get(url)
    .then(res=>
      {
      let data = res.data.recordset;
      this.Alldatafamerbyzone = data; 
      this.Selectfarmer = this.Alldatafamerbyzone;
      }
    ).catch(error =>{ console.log(error);
    })
  }

  // Add to first Form
  fullname;
  cardid;
  fmcode;
  Toformdata(){
    let name = this.FormFirst.get('fullname').value;
    let data = this.Selectfarmer.filter(el => el.fmcode_b1 === name.slice(1,11));
    this.fullname = data[0].fmname;
    this.cardid = data[0].IDCARD;
    this.fmcode = data[0].fmcode;
    console.log(name);
  }

  // 10 ข้อมูลล่าสุดที่บันทึกคำประกัน
  tendata;
  Loadtendata(){
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/dbbrr/select_top_Promise6566";
    axios.get(url)
    .then(res=>
      {
      let data = res.data.recordset;
      this.tendata = data; 
      }
    ).catch(error =>{ console.log(error);
    })
  }

  // ตรวจสอบคนค้ำประกัน
  Selectfmcode(){
    let fmcode = this.FormFirst.get('fullname').value;
    console.log(fmcode);
  }
  person1;person2;person3;
  CheckFarmer1(){
    let fmcode = this.FormCredit.get('fmcodeperson1').value;
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_credit_ckpromise6566Byfmcode?fmcode=" + fmcode;
    axios.get(url)
    .then(res=>
      {
      let data = res.data.recordset;
      this.person1 = data; 
    }
    ).catch(error =>{ console.log(error);
    })
   
  }

  CheckFarmer2(){
    let fmcode = this.FormCredit.get('fmcodeperson2').value;
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_credit_ckpromise6566Byfmcode?fmcode=" + fmcode;
    axios.get(url)
    .then(res=>
      {
      let data = res.data.recordset;
      this.person2 = data; 
      }
    ).catch(error =>{ console.log(error);
    })
  }

  CheckFarmer3(){
    let fmcode = this.FormCredit.get('fmcodeperson3').value;
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_credit_ckpromise6566Byfmcode?fmcode=" + fmcode;
    axios.get(url)
    .then(res=>
      {
      let data = res.data.recordset;
      this.person3 = data; 
      }
    ).catch(error =>{ console.log(error);
    })
  }

  // บันทึกข้อมูล แบบใช้เหลักทรัพย์
  InsertCredit(){
    const now = new Date;
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    var date = year+"-" + month+"-"  + day +" "+ hour+":"+minute+":"+second;
    let birthday = this.FormFirst.get('birthday').value;
    let fullname = (<HTMLInputElement>document.getElementById("fullname")).value;
    let cardid = (<HTMLInputElement>document.getElementById("cardid")).value;
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/dbbrr/insert_Promise6566?FMCODE='"+this.fmcode+"'&FullName='"+fullname+"'&Birthday='"+birthday+"'&ID_No='"+cardid+"'&DateAdd='"+date+"'&DateUpdate='"+date+"'" ;
    axios.post(url)
    .then(res=> {
      console.log(res);
      if(res.data.rowsAffected.length == 1 )
      {
        alert("บันทึกข้อมูลแล้วค่ะ");
      }
      else { alert("บันทึกข้อมูลไม่สำเร็จ");}
    }).catch(error => console.log(error))
    this.Loadtendata();
  }
  // บันทึกแบบมีคนค้ำ 3 คน
  InsertCreditWithPerson(){
    let fmcode = (this.FormFirst.get('fullname').value).slice(1,7); 
    let birthday = this.FormFirst.get('birthday').value;
    const now = new Date;
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    var date = year+"-" + month+"-"  + day +" "+ hour+":"+minute+":"+second;
    let fmcode1 = this.FormCredit.get('fmcodeperson1').value;
    let fmcode2 = this.FormCredit.get('fmcodeperson2').value;
    let fmcode3 = this.FormCredit.get('fmcodeperson3').value;
    let fmname1 = (<HTMLInputElement>document.getElementById("fmnameperson1")).value;
    let fmname2 = (<HTMLInputElement>document.getElementById("fmnameperson2")).value;
    let fmname3 = (<HTMLInputElement>document.getElementById("fmnameperson3")).value;
    let fullname = (<HTMLInputElement>document.getElementById("fullname")).value;
    let cardid = (<HTMLInputElement>document.getElementById("cardid")).value;
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/dbbrr/insert_Promise6566?FMCODE='"+this.fmcode+"'&FullName='"+fullname+"'&Birthday='"+birthday+"'&ID_No='"+cardid+"'&FmCode1='"+fmcode1 +"'&FullName1='"+fmname1+"'&FmCode2='"+fmcode2 +"'&FullName2='"+fmname2+"'&FmCode3='"+fmcode3 +"'&FullName3='"+fmname3+"'&DateAdd='"+date+"'&DateUpdate='"+date+"'" ;
    axios.post(url)
    .then(res=> {
      if(res.data.rowsAffected.length == 1 )
      {
        alert("บันทึกข้อมูลแล้วค่ะ");
      }
      else if(res.data.code) { alert("บันทึกข้อมูลไม่สำเร็จ");}
      console.log(res);
    }).catch(error => console.log(error))
    this.Loadtendata();
  }

  // สืบค้นข้อมูลชาวไร่
  Findfarmmerdata(){
    let text = this.FormCredit.get('fmnameorcode').value;
    let fmdata = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/fmsearch?fmname='+text+'';
    axios.get(fmdata)
    .then(res=>
      {
      let data = res.data.recordset;
      this.Farmerdata = new MatTableDataSource(data);
      }
    ).catch(error =>{ console.log(error);
    })
  }
}
