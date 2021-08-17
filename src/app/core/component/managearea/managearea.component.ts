import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import axios from 'axios';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Authenticationservice } from '../../services/authentication.service';

@Component({
  selector: 'app-managearea',
  templateUrl: './managearea.component.html',
  styleUrls: ['./managearea.component.css']
})
export class ManageareaComponent implements OnInit {
  supcode;
  supzone;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Formaddarea:FormGroup;
  constructor(private router: Router, private auth :Authenticationservice) { 
    this.Formaddarea = new FormGroup({
      fmcode: new FormControl(),
      tel: new FormControl(),
      area_new:new FormControl(),
      type_area:new FormControl(),
      note:new FormControl(),
      plant_date:new FormControl(),
      NAMEMOO:new FormControl(),
      Confirm:new FormControl(),
      fmnameorcode:new FormControl(),
      supcode:new FormControl(),
      editplant_date:new FormControl(),

      latlong:new FormControl(),
    })
  }
  displayfarmaer:string[]=['fmcode','fmname','zone','cane'];
  datacolum:string[] = ['fmcode','fmname','type_area','area_new','NAMEMOO','plant_date','date_left','supcode','note','latlong','action'];
  decryptedInfo;
  ngOnInit(): void {
    if (localStorage.getItem('userdata') === null || localStorage.getItem('userdata') === undefined) {
      this.router.navigateByUrl('/loign');
    }
    
    let userdata;
    userdata = this.auth.Authention();
    this.supcode = userdata.supcode;
    this.supzone = userdata.zonedata;
    this.Loadselect_village_in_sugarcane();
    this.SelectAllinformarea_6566();
   
     
      this.Filterareabyfmcode();
   
    this.Selectdatainformarea6566.paginator = this.paginator;
    this.Selectdatainformarea6566.sort = this.sort;

  
  }
  panelOpenState = false;

  ngAfterViewInit() {
  
  }
  AlldataSelectinformarea6566;
  Selectdatainformarea6566;
  SelectAllinformarea_6566(){
    axios.get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_informarea_6566").then(res=> 
     {
       let data = res.data.recordset;
       this.AlldataSelectinformarea6566 = data;
     })
     .catch(error => console.log(error));

     setTimeout(() => {
      this.Select_informarea_6566();
    }, 2500);
  }

  Select_informarea_6566(){
      let data = this.AlldataSelectinformarea6566.filter(el => el.supzone.trim() === this.supzone);
      this.Selectdatainformarea6566 = new MatTableDataSource(data);
  }

  Filterareabyfmcode(){
    let data = this.AlldataSelectinformarea6566.filter(el => el.supzone.trim() === this.supzone);
    let newdata = Array.from(new Set(data.map(function (elem){return elem.fmcode;})));
    console.log(newdata);
  }

  Filterby(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.Selectdatainformarea6566.filter = filterValue.trim().toLowerCase();;
    if (this.Selectdatainformarea6566.paginator) {
      this.Selectdatainformarea6566.paginator.firstPage();
    }
  }

  FilterbyFarmer(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.Farmerdata.filter = filterValue.trim().toLowerCase();;
    if (this.Farmerdata.paginator) {
      this.Farmerdata.paginator.firstPage();
    }
  }
  alldatavillage;

  // โหลดข้อมูลหมู่บ้าน
  Loadselect_village_in_sugarcane(){
    let url ="https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_village_in_sugarcane";
    axios.get(url).then(res => {
      let data = res.data.recordset;
      this.alldatavillage = data;
    } )
    .catch(error => {console.log(error);}
    )
  }

  // ใช้หมู่บ้านเดิม
  oldvillage;
  Olddata(){
    this.Formaddarea.get('NAMEMOO').setValue(this.oldvillage);
  }

  // เพิ่มแปลงขยาย
  Insernewarea(){

    let fmcode = (<HTMLInputElement>document.getElementById("fmcode")).value
    let tel = this.Formaddarea.get('tel').value;
    let area_new = this.Formaddarea.get('area_new').value;
    // let supcode = this.Formaddarea.get('supcode').value;
    let note = this.Formaddarea.get('note').value;
    let plant_date = this.Formaddarea.get('plant_date').value;
    let NAMEMOO = this.Formaddarea.get('NAMEMOO').value;
    let latlong = this.Formaddarea.get('latlong').value;

    this.oldvillage = NAMEMOO;
    if (plant_date == null) {plant_date = null;}
    if (note == null) {note ='';}
    if (NAMEMOO == null || area_new == null){ alert("กรุณากรอกข้อมูลหมู่บ้าน พื้นที่ ");}
    else {
      let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/insert_informarea?yearid=6566&supcode='" + this.supcode + "'&fmcode='" +fmcode+ "'&tel='"+ tel+"'&area_new="+area_new+"&type_area='er_new'&note='"+ note +"'&plant_date="+plant_date+"&villagecode='"+NAMEMOO.slice(0,8)+"'&lat_long="+latlong;
      axios.post(url)
      .then(res => {
        if(res.data.code)
        {
          alert("บันทึกข้อมูลไม่สำเร็จ");
        }
  
        if(res.data.rowsAffected)
        {
          alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
        }
  
      })
      .catch(error => {console.log(error);})
    }
   
    this.SelectAllinformarea_6566();
    $('input[type="text"]').val('');
  }
  // ยกเลิกแปลงขยาย
  Canclenewarea(dataid){
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/canceled_informarea?dataid='+dataid;
    if(confirm("ต้องการยกเลิกข้อมูลหรือไม่"))
    {
      axios.post(url)
      .then(res => {
        console.log(res);
        if(res.data.code)
        {
          alert("อัพเดทข้อมูลไม่สำเร็จ");
        }
  
        if(res.data.rowsAffected)
        {
          alert("ยกเลิกรายการแล้วค่ะ!");
        }
      })
      .catch(error => {console.log(error);})
    }
    else{
      
    }
   
    this.SelectAllinformarea_6566();
  }
  famercode='';
  test(code){
    console.log(code);
    this.famercode = code;
  }
  // ตรวรสอบข้อมูลเดิม
  Singledata;
  newarea='';
  note='';
  mooname='';
  oldfmcode='';
  CheckEditnewarea(dataid){
    this.Singledata = this.AlldataSelectinformarea6566.filter(element => element.dataid == dataid);
    this.newarea = this.Singledata[0].area_new;
    this.note = this.Singledata[0].note;
    this.mooname = this.Singledata[0].villagecode+ "  บ." + this.Singledata[0].village;
    this.oldfmcode  = this.Singledata[0].fmcode;
  }
  // แก้ไขแปลงขยาย

  Editnewarea(dataid){
    let note = (<HTMLInputElement>document.getElementById('note')).value;
    let area_new = (<HTMLInputElement>document.getElementById('area_new')).value;

    let newfmcode = (<HTMLInputElement>document.getElementById('newfmcode')).value;
    let villagecode = (<HTMLInputElement>document.getElementById('villagecode')).value;
    let date = this.Formaddarea.get('editplant_date').value;

    if(newfmcode == null || villagecode == null || area_new == null) {alert("กรุณากรอก รหัสชาวไร่ หรือ หมู่บ้าน หรือ พื้นที่ หรือ วันปลูก");}
    let url="https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/update_informarea?dataid="+dataid+"&area_new="+area_new+"&note="+note+"&plant_date="+date+"&villagecode="+villagecode.slice(0,8)+"&fmcode="+newfmcode+"&type_area=er_new";
    if(confirm("ต้องการบันทึกข้อมูลหรือไม่ ?")){
      axios.post(url)
    .then(res => {
      if(res.data.code)
        {
          alert("อัพเดทข้อมูลไม่สำเร็จ");
        }
        if(res.data.rowsAffected)
        {
        
          alert("save data!");
          
        }
    })
    .catch(error => {console.log(error);})
    }
    // $('#Editplantarea').hide();
  
    this.SelectAllinformarea_6566();
    $('input[type="text"]').val('');
    // ($('#Editplantarea') as any).modal('hide');
    // $('.modal-backdrop').remove();
  }
   // สืบค้นข้อมูลชาวไร่
   Farmerdata;
   Findfarmmerdata(){
    let text = this.Formaddarea.get('fmnameorcode').value;
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
