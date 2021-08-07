import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-docforgroupcut',
  templateUrl: './docforgroupcut.component.html',
  styleUrls: ['./docforgroupcut.component.css']
})
export class DocforgroupcutComponent implements OnInit {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  constructor() { }

  ngOnInit(): void {
    this.Nowdate();
  }

  Singlefamerdata;
  allplant;
  plantarea;
  Assessarea;
  fmcode;
  fmname;
  fmtel;
  today;
  
  Nowdate(){
    const date = new Date(2020, 7, 1)
    const result = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  this.today = result;
  }
  
  Loaddataplant(){
    let fmcode = (<HTMLInputElement>document.getElementById("testfmcode")).value;
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/cpSearchBytext_fm?text_ar="+fmcode;
    axios.get(url)
    .then(res => {
      let data = res.data.recordset;
      this.Singlefamerdata = data;
      let newlandvalue = data.map(function (el){ return el.landvalue})
      let newAssess = data.map(function (el){ return el.Assess})
      let sumlandvalue = newlandvalue.reduce((a, b) => a + b, 0);
      let sumAssess= newAssess.reduce((a, b) => a + b, 0);
      this.plantarea = sumlandvalue.toFixed(2);
      this.Assessarea = sumAssess.toFixed(2);
      this.allplant = res.data.rowsAffected[0];

      this.fmname = data[0].fmname;
      this.fmcode = data[0].fmcode;
      this.fmtel = data[0].TEL;;
    })
    .catch(err=>{console.log(err);})
  }


  generatePDF() {
    var data = document.getElementById('pdfTable');
    html2canvas(data).then(canvas => {
    
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 211, 298)
      pdf.save('newPDF.pdf');
      
    });
  }
  print(){
    window.print();
  }
 
}
