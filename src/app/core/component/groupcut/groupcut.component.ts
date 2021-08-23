import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';

@Component({
  selector: 'app-groupcut',
  templateUrl: './groupcut.component.html',
  styleUrls: ['./groupcut.component.css']
})
export class GroupcutComponent implements OnInit {

  FormCutGroup:FormGroup;
  constructor() { 
    
  }
  ColumByzone:string[] = [ 'supzone','route','intlandno','fmname','CaneTypeName','landvalue','Assess','Ton','period_cut','groupCode','Qtype','action'];
  DataByZone;
  itid;
  ngOnInit(): void {
    this.FormCutGroup = new FormGroup({
      fmdata: new FormControl(), 
      groupnameedit: new FormControl(),
      groupcodeedit: new FormControl(),
      timecut: new FormControl(),
    })
  setTimeout(() => {
    this.Gettimecut();
    this.GetMainGroupcup();
  }, 10000);  

  this.FormCutGroup.get('timecut').setValue(0);
  this.FormCutGroup.get('groupcodeedit').setValue(0);
  }

  LoaddataGroupcupbyzone(){
    let data = (this.FormCutGroup.get('fmdata').value).trim();
    let url="https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/cpSearchBytext_fm?text_ar="+data;
    axios
    .get(url)
    .then(response => {
      let data =  response.data.recordsets[0];
      this.DataByZone = new MatTableDataSource(data);
     
      // console.log(this.DataByZone);
    })
    .catch(err => {
      console.error(err)
    })
  }

  Filterby(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataByZone.filter = filterValue.trim().toLowerCase();;
    if (this.DataByZone.paginator) {
      this.DataByZone.paginator.firstPage();
    }
  }

  // แก้ไขกลุ่มและงวดตัด
  Editgroupandtime(){
    let time = this.FormCutGroup.get('timecut').value;
    let groupcode = this.FormCutGroup.get('groupcodeedit').value;
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/update_cp_groupCode?itid="+this.itid+"&period_cut="+time+"&groupCode="+groupcode.slice(0,6);
    if(confirm("ต้องการแก้ไขข้อมูล")) {
      axios.get(url)
      .then(function (response) {
        console.log(response);
        if (response.data.code)
        {
          alert("บันทึกข้อมูลไม่สำเร็จ");
        }
        else  if(response.data.rowsAffected)
        {
          alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
        }
      });
    }
    else {
       alert("ยกเลิกรายการ");
    }
    $('input[type="text"]').val('');
    this.FormCutGroup.get('timecut').setValue(0);
    this.FormCutGroup.get('groupcodeedit').setValue(0);
    setTimeout(() => {
      this.LoaddataGroupcupbyzone();
      
    }, 1500);
  }

  oldtime;
  oldgroup;
  openedit(itid,cutg,time){
    this.itid = itid;
    this.oldgroup = cutg;
    this.oldtime = time;
    console.log( this.oldgroup );
  }

  timecut;
  Gettimecut(){
    axios
    .get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_v_period")
    .then(response => {
      let data =  response.data.recordsets[0];
      this.timecut = data;
     
      // console.log(this.DataByZone);
    })
    .catch(err => {
      console.error(err)
    })
  }

  Maincut;
  GetMainGroupcup(){
    axios.get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode")
    .then(response => {
      let data =  response.data.recordsets[0];
      this.Maincut = data.filter(element => element.category ==='H' && element.position == 0);
     
      // console.log(this.Maincut);
    })
    .catch(err => {
      console.error(err)
    })
  }



}
