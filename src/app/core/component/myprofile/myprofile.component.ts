import { Component, Input, OnInit } from '@angular/core';

import * as CanvasJS from '../../../supporter/canvasjs.min.js';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  @Input() supcode;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.Mychart();
    }, 15000);
    
  }

  Mychart(){
   
    // console.log(this.chart)
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/targetArea6465';
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        let chartsup = data.filter(element => element.supcode == this.supcode)
        let MyArea = new CanvasJS.Chart("MyArea", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          
          title:{
            fontSize: 20,
            labelTextAlign: "center",
            fontFamily: "Sarabun, sans-serif",
            text: "กราฟแสดงพื้นที่ปลูกอ้อย", 
            
          },
          data: [{
            type: "doughnut",
            showInLegend: true,
            fontFamily: "Sarabun, sans-serif",
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [ 
              { y: chartsup[0].pc_target_areas, name: "พื้นที่ปลูกทั้งหมด" , legendText: "พื้นที่ปลูกทั้งหมด :"  + chartsup[0].target_areas + " ไร่" , color : "#43AA8B" },
              { y: 100-chartsup[0].pc_target_areas, name: "พื้นที่ปลูกที่ขาด"  , color : "#FF3333" },
            
            ]
          }]
        });

        let MyTon = new CanvasJS.Chart("MyTon", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          
          title:{
            fontSize: 20,
            labelTextAlign: "center",
            fontFamily: "Sarabun, sans-serif",
            text: "กราฟแสดงประเมินอ้อยอ้อย", 
            
          },
          data: [{
            type: "doughnut",
            showInLegend: true,
            fontFamily: "Sarabun, sans-serif",
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [
              { y: chartsup[0].pc_target_ton, name: "ประเมินอ้อยทั้งหมด" , legendText: "ประเมิน :" + chartsup[0].target_ton + " ตัน", color : "#43AA8B" },
              { y: 100-chartsup[0].pc_target_ton, name: "ประเมินอ้อยที่ขาด" , color : "#FF3333" },
            
            ]
          }]
        });

        let MyYield = new CanvasJS.Chart("MyYield", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          
          title:{
            fontSize: 20,
            labelTextAlign: "center",
            fontFamily: "Sarabun, sans-serif",
            text: "กราฟแสดงค่า Yield อ้อย", 
            
          },
          data: [{
            type: "doughnut",
            showInLegend: true,
            fontFamily: "Sarabun, sans-serif",
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [
              { y: chartsup[0].pc_target_yield, name: "Yield ทั้งหมด" , color : "#43AA8B" },
              { y: 100-chartsup[0].pc_target_yield, name: "Yield ที่ขาด" , color : "#FF3333" },
            
            ]
          }]
        });

      MyArea.render();
      MyTon.render();
      MyYield.render();
      })
      .catch(err => { throw err });

   
   
    
    // console.log(this.chart)
  }
}
