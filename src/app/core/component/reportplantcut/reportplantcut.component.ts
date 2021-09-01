import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reportplantcut',
  templateUrl: './reportplantcut.component.html',
  styleUrls: ['./reportplantcut.component.css']
})
export class ReportplantcutComponent implements OnInit {


  constructor(private spinner: NgxSpinnerService) { 
    
  }
  today;
  ngOnInit(): void {
    this.Nowdate();
  }

  Nowdate(){
    const date = new Date()
    const result = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  this.today = result;
  }

  datagroup;
  Getsupgroup() {
    let text = (<HTMLInputElement>document.getElementById("groupcode")).value;
    axios.get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode")
      .then((out: any) => {
        const data = out.data.recordset;
        this.datagroup = data.filter(element => element.groupcode == text)
       
      })
      .catch(err => { throw err });
  }
  datareportplantcup;
  Loadreportplantcup(){
    this.Getsupgroup();
    this.spinner.show();
    let text = (<HTMLInputElement>document.getElementById("groupcode")).value;
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_cp6465bygroupCode_from?groupCode="+ text;
    axios.get(url)
    .then(res => {
      this.datareportplantcup = res.data.recordset;
      // console.log(this.datareportplantcup);
      if (res.data.rowsAffected == 0)
      {alert("ไม่มีข้อมูล");}
    }).catch(err => {console.log(err)})
    this.spinner.hide();
  }

  print(){
    window.print();
  }
 
}
