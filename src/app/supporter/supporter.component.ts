import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as CanvasJS from './canvasjs.min.js';

import { Authenticationservice } from '../core/services/authentication.service';

@Component({
  selector: 'app-supporter',
  templateUrl: './supporter.component.html',
  styleUrls: ['./supporter.component.css']
})
export class SupporterComponent implements OnInit {
  /// Valiable ///
  decryptedInfo;
  level;
  home = true;
  graph = false;
  Timecheck: FormGroup;
  code;
  chart;
  manager = false;
  supportercode: any;
  grade: any[];
  score: any[];

  maindata: any[];
  allbrd;
  allZ;
  color = false;
  selecttime = [
    { time: 'ประจำงวดวันที่ 25 มี.ค. - 10 เม.ย. 2564', set: '0302' },
    { time: 'ประจำงวดวันที่ 11 เม.ย. - 25 เม.ย. 2564', set: '0401' },
    { time: 'ประจำงวดวันที่ 26 เม.ย. - 10 พ.ค. 2564', set: '0402' },
    { time: 'ประจำงวดวันที่ 25 พ.ค. - 10 มิ.ย. 2564', set: '0501' },
  ]
  selectzone = [
    { zonecode: '' },
    { zonecode: '01.1' },
    { zonecode: '01.2' },
    { zonecode: '02' },
    { zonecode: '02.1' },
    { zonecode: '03.1' },
    { zonecode: '03.2' },
    { zonecode: '04' },
    { zonecode: '05' },
    { zonecode: '06.1' },
    { zonecode: '06.2' },
    { zonecode: '07.1' },
    { zonecode: '07.2' },
    { zonecode: '08.1' },
    { zonecode: '08.2' },
    { zonecode: '09' },
    { zonecode: '09.1' },
    { zonecode: '10.1' },
    { zonecode: '10.2' }

  ];
  takedata;

  /// End ////
  constructor(private router: Router, private spinner: NgxSpinnerService,private auth: Authenticationservice) {
    this.Timecheck = new FormGroup({
      selettime: new FormControl(Validators.required),
      seletzone: new FormControl(),
    });
  }

  lebdata;
  ngOnInit(): void {
    if (localStorage.getItem('userdata') === null || localStorage.getItem('userdata') === undefined) {
      this.router.navigateByUrl('/loign');
    }
    else {
      this.lebdata = this.auth.Authention();
      this.code = this.lebdata.supcode;
      this.level = this.lebdata.userlevel
      this.Allchart();
      if (this.code !== '923') {
        this.manager = true;
      }
    }
    setTimeout(() => {
      localStorage.removeItem('userdata');
      localStorage.clear();
      this.router.navigateByUrl("/login");
    }, 3600000);
  }


  check(x) {

    if (x == 1) {
      this.home = true;

      this.graph = false;

      document.getElementById("alltarget").style.display = "block";

      document.getElementById('graph').style.display = "none";
    }

    else if (x == 4) {
      this.home = false;
      this.graph = true
      document.getElementById("alltarget").style.display = "none";
      document.getElementById('graph').style.display = "block";
    }
  }

  Allchart() {
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/targetArea6465';
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        let chartbrd = data.filter(element => element.Partcode == "BRD")
        let P1 = data.filter(element => element.Partcode == "P1" && element.SUPZONE === "P" && element.supcode === "z")
        let P2 = data.filter(element => element.Partcode == "P2" && element.SUPZONE === "P" && element.supcode === "z")
        let P3 = data.filter(element => element.Partcode == "P3" && element.SUPZONE === "P" && element.supcode === "z")
        let P4 = data.filter(element => element.Partcode == "P4" && element.SUPZONE === "P" && element.supcode === "z")
        let BRDArea = new CanvasJS.Chart("BRDArea", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,

          title: {
            fontSize: 20,
            labelTextAlign: "center",
            fontFamily: "Sarabun, sans-serif",
            text: "กราฟแสดงพื้นที่ปลูกอ้อย โดยรวม BRD",

          },
          data: [{
            type: "doughnut",
            showInLegend: true,
            fontFamily: "Sarabun, sans-serif",
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [
              { y: chartbrd[0].pc_target_areas, name: "พื้นที่ปลูกทั้งหมด", color: "#43AA8B" },
              { y: 100 - chartbrd[0].pc_target_areas, name: "พื้นที่ปลูกที่ขาด", color: "#FF3333" },

            ]
          }]
        });

        let BRDTon = new CanvasJS.Chart("BRDTon", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,

          title: {
            fontSize: 20,
            labelTextAlign: "center",
            fontFamily: "Sarabun, sans-serif",
            text: "กราฟแสดงประเมินอ้อย โดยรวม BRD",

          },
          data: [{
            type: "doughnut",
            showInLegend: true,
            fontFamily: "Sarabun, sans-serif",
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [
              { y: chartbrd[0].pc_target_ton, name: "ประเมินอ้อยทั้งหมด", color: "#43AA8B" },
              { y: 100 - chartbrd[0].pc_target_ton, name: "ประเมินอ้อยที่ขาด", color: "#FF3333" },

            ]
          }]
        });

        let BRDYield = new CanvasJS.Chart("BRDYield", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,

          title: {
            fontSize: 20,
            labelTextAlign: "center",
            fontFamily: "Sarabun, sans-serif",
            text: "กราฟแสดงค่า Yield อ้อย โดยรวม BRD",

          },
          data: [{
            type: "doughnut",
            showInLegend: true,
            fontFamily: "Sarabun, sans-serif",
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [
              { y: chartbrd[0].pc_target_yield, name: "Yield ทั้งหมด", color: "#43AA8B" },
              { y: 100 - chartbrd[0].pc_target_yield, name: "Yield ที่ขาด", color: "#FF3333" },

            ]
          }]
        });

        BRDArea.render();
        BRDTon.render();
        BRDYield.render();
      })
      .catch(err => { throw err });
  }



  // GetGradeSupporter() {
  //   let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/dbcps/intro_groupAAA_6465';
  //   fetch(url)
  //     .then(res => res.json())
  //     .then((out: any) => {
  //       const data = out.recordsets[0];
  //       let allbrd = data.filter(element => element.Partcode =="BRD")
  //       // console.log(data)
  //       // console.log(allbrd[0].Partcode)

  //       let chart = new CanvasJS.Chart("chartContainer", {
  //         theme: "light2",
  //         animationEnabled: true,
  //         exportEnabled: true,

  //         title:{
  //           fontSize: 20,
  //           labelTextAlign: "center",
  //           fontFamily: "Sarabun, sans-serif",
  //           text: "กราฟแสดงเกรดแปลงอ้อย โดยรวม BRD", 

  //         },
  //         data: [{
  //           type: "pie",
  //           showInLegend: true,
  //           toolTipContent: "<b>{name}</b>: {y} (#percent%)",
  //           indexLabel: "{name} - #percent%",
  //           dataPoints: [
  //             { y: allbrd[0].pc_gradeA, name: "แปลงเกรด A" },
  //             { y: allbrd[0].pc_gradeB, name: "แปลงเกรด B" },
  //             { y: allbrd[0].pc_gradeC, name: "แปลงเกรด C" },
  //           ]
  //         }]
  //       });
  //     chart.render();

  //     })
  //     .catch(err => { throw err });

  // }


  /// พื้นที่ปลูก
  Maindashboard() {
    let time = (new Date(this.Timecheck.get('selettime').value).getTime() / 1000);
    let zone = this.Timecheck.get('seletzone').value;
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/informarea6465ByDate?lastdate=' + time;
    this.spinner.show();
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        if (data.length == 0) { alert('ไม่มีข้อมูลวันที่ดังกล่าว'); }
        else {
          let allbrd = data;
          let zonebrd = data.filter(element => element.SUPZONE.trim() === zone)
          let Zone = data.filter(element => element.supcode == "Z" && element.Partcode !== "BRD")
          let alldata = data.filter(element => element.Partcode !== "BRD" && element.supcode !== "Z")
          if (zone == null || zone == '') { this.maindata = allbrd; }
          else { this.maindata = zonebrd; }
          console.log(this.maindata)
        }
        this.spinner.hide();
      })
      .catch(err => { throw err });
  }


  Printdata() {
    window.print()
  }

}