import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import axios from 'axios';
import { element } from 'protractor';

@Component({
  selector: 'app-managearea',
  templateUrl: './managearea.component.html',
  styleUrls: ['./managearea.component.css']
})
export class ManageareaComponent implements OnInit {
  @Input() supcode;
  @Input() supzone;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Formaddarea:FormGroup;
  constructor() { 
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

    })
  }
  displayfarmaer:string[]=['fmcode','fmname','zone','cane'];
  datacolum:string[] = ['fmcode','fmname','type_area','area_new','NAMEMOO','plant_date','date_left','supcode','note','action'];

  
  ngOnInit(): void {
    this.SelectAllinformarea_6566();
    setTimeout(() => {
      this.Select_informarea_6566();
    }, 3000);
    setTimeout(() => {
      this.Filterareabyfmcode();
    }, 4000);
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
  // เพิ่มแปลงขยาย
  Insernewarea(){

    let fmcode = (<HTMLInputElement>document.getElementById("fmcode")).value
    let tel = this.Formaddarea.get('tel').value;
    let area_new = this.Formaddarea.get('area_new').value;
    let supcode = this.Formaddarea.get('supcode').value;
    let type_area = this.Formaddarea.get('type_area').value;
    let note = this.Formaddarea.get('note').value;
    let plant_date = this.Formaddarea.get('plant_date').value;
    let NAMEMOO = this.Formaddarea.get('NAMEMOO').value;

    if (fmcode == null || NAMEMOO == null || area_new == null || plant_date == null){ alert("กรุณากรอกข้อมูลให้ครบ");}
    else {
      let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/insert_informarea?yearid=6566&supcode='" + supcode + "'&fmcode='" +fmcode+ "'&tel='"+ tel+"'&area_new="+area_new+"&type_area='er_new'&note='"+ note +"'&plant_date='"+plant_date+"'&NAMEMOO='"+NAMEMOO+"'";
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
   
    this.Select_informarea_6566();
    $('input[type="text"]').val('');
  }
  // ยกเลิกแปลงขยาย
  Canclenewarea(dataid){
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/canceled_informarea?dataid='+dataid;
    if(confirm("ต้องการยกเลิกข้อมูลหรือไม่"))
    {
      axios.post(url)
      .then(res => {console.log(res);})
      .catch(error => {console.log(error);})
    }
    else{
      
    }
   
    this.Select_informarea_6566();
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
  CheckEditnewarea(dataid){
    this.Singledata = this.AlldataSelectinformarea6566.filter(element => element.dataid == dataid);
    this.newarea = this.Singledata[0].area_new;
    this.note = this.Singledata[0].note;
    this.mooname = this.Singledata[0].NAMEMOO;
  }
  // แก้ไขแปลงขยาย

  Editnewarea(dataid){
    let note = (<HTMLInputElement>document.getElementById('note')).value;
    let area_new = (<HTMLInputElement>document.getElementById('area_new')).value;
    let NAMEMOO = (<HTMLInputElement>document.getElementById('NAMEMOO')).value;
    let date = this.Formaddarea.get('plant_date').value;
    let url="https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/update_informarea?area_new="+area_new+"&note="+note+"&plant_date="+date+"&NAMEMOO="+NAMEMOO+"&dataid="+dataid;
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
    
    this.Select_informarea_6566();
    $('input[type="text"]').val('');
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