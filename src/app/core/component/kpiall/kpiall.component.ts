import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Authenticationservice } from '../../services/authentication.service';
@Component({
  selector: 'app-kpiall',
  templateUrl: './kpiall.component.html',
  styleUrls: ['./kpiall.component.css']
})
export class KpiallComponent implements OnInit {
  FormCode: FormGroup;
  alldatas: any[];
  Formsupport:FormGroup;
  selecttime = [
    { time: 'ประจำงวดวันที่ 25 มี.ค. - 10 เม.ย. 2564', set: '0302' },
    { time: 'ประจำงวดวันที่ 11 เม.ย. - 25 เม.ย. 2564', set: '0401' },
    { time: 'ประจำงวดวันที่ 26 เม.ย. - 10 พ.ค. 2564', set: '0402' },
    { time: 'ประจำงวดวันที่ 21 พ.ค. - 25 พ.ค. 2564', set: '0501' },
  ]

  kpi402:any[];
  supportdata: any[];
  time: any;
  before = true;
  after = false;

  selectzone = [
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
  usercode: any;
  constructor(private spinner: NgxSpinnerService,private auth:Authenticationservice) {
    this.FormCode = new FormGroup({
      selectzone: new FormControl(),
      supporttercode: new FormControl(),
    });
    this.Formsupport = new FormGroup({
      selettime: new FormControl(),
    });
   }

  ngOnInit(): void {
    let userdata;
    userdata = this.auth.Authention();
    this.usercode = userdata.supcode;
  }

  GetAllKPISupporter() {
    let zonecode = this.FormCode.get('selectzone').value;
    this.spinner.show();
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/kpi6465/kpiSupcode?supzone=' + zonecode + '';
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        console.log(data)
        this.alldatas = data;
        return this.alldatas;
      })
      .catch(err => { throw err });
    setTimeout(() => {  
      this.spinner.hide();
    }, 7000);
  }
  
  GetdataFormCode() {
    let zonecode = this.FormCode.get('selectzone').value;
    let code = this.FormCode.get('supporttercode').value;
    // console.log(zonecode + code);
    $.getJSON("https://asia-southeast2-brr-farmluck.cloudfunctions.net/kpi6465/kpiSupcode?supzone=" + zonecode + " ", function (data) {
      var i, j = 1;
      let supporterdata = data.recordsets[0];


      for (i = 0; i < supporterdata.length; i++) {
        let SUPNAME = supporterdata[i].SUPNAME;
        let supcode = supporterdata[i].Supcode;
        let SUPZONE = supporterdata[i].Supzone;
        let Partcode = supporterdata[i].Partcode;
        let target1 = supporterdata[i].Target1
        let target2 = supporterdata[i].Target2
        let target3 = supporterdata[i].Target3
        let target4 = supporterdata[i].Target4
        let target5 = supporterdata[i].Target5
        let target6 = supporterdata[i].Target6
        let target7 = supporterdata[i].Target7
        let target8 = supporterdata[i].Target8
        let target9 = supporterdata[i].Target9
        let target10 = supporterdata[i].Target10
        let target11 = supporterdata[i].Target11
        let target12 = supporterdata[i].Target12
        let target13 = supporterdata[i].Target13
        let target14 = supporterdata[i].Target14
        let target15 = supporterdata[i].Target15
        let target16 = supporterdata[i].Target16
        let target17 = supporterdata[i].Target17
        let target18 = supporterdata[i].Target18
        let target19 = supporterdata[i].Target19
        let target20 = supporterdata[i].Target20
        let target21 = supporterdata[i].Target21
        let target22 = supporterdata[i].Target22
        let target23 = supporterdata[i].Target23
        let target24 = supporterdata[i].Target24
        let target25 = supporterdata[i].Target25
        let target26 = supporterdata[i].Target26
        let target27 = supporterdata[i].Target27
        let target28 = supporterdata[i].Target28
        let target29 = supporterdata[i].Target29
        let target30 = supporterdata[i].Target30
        let target31 = supporterdata[i].Target31
        let target32 = supporterdata[i].Target32
        let target33 = supporterdata[i].Target33
        let target34 = supporterdata[i].Target34
        let target35 = supporterdata[i].Target35
        let target36 = supporterdata[i].Target36
        let target37 = supporterdata[i].Target37
        let target38 = supporterdata[i].Target38
        let target39 = supporterdata[i].Target39
        let target40 = supporterdata[i].Target40
        let target41 = supporterdata[i].Target41
        let target42 = supporterdata[i].Target42
        let target43 = supporterdata[i].Target43
        let target44 = supporterdata[i].Target44

        let Success1 = supporterdata[i].Success1
        let Success2 = supporterdata[i].Success2
        let Success3 = supporterdata[i].Success3
        let Success4 = supporterdata[i].Success4
        let Success5 = supporterdata[i].Success5
        let Success6 = supporterdata[i].Success6
        let Success7 = supporterdata[i].Success7
        let Success8 = supporterdata[i].Success8
        let Success9 = supporterdata[i].Success9
        let Success10 = supporterdata[i].Success10
        let Success11 = supporterdata[i].Success11
        let Success12 = supporterdata[i].Success12
        let Success13 = supporterdata[i].Success13
        let Success14 = supporterdata[i].Success14
        let Success15 = supporterdata[i].Success15
        let Success16 = supporterdata[i].Success16
        let Success17 = supporterdata[i].Success17
        let Success18 = supporterdata[i].Success18
        let Success19 = supporterdata[i].Success19
        let Success20 = supporterdata[i].Success20
        let Success21 = supporterdata[i].Success21
        let Success22 = supporterdata[i].Success22
        let Success23 = supporterdata[i].Success23
        let Success24 = supporterdata[i].Success24
        let Success25 = supporterdata[i].Success25
        let Success26 = supporterdata[i].Success26
        let Success27 = supporterdata[i].Success27
        let Success28 = supporterdata[i].Success28
        let Success29 = supporterdata[i].Success29
        let Success30 = supporterdata[i].Success30
        let Success31 = supporterdata[i].Success31
        let Success32 = supporterdata[i].Success32
        let Success33 = supporterdata[i].Success33
        let Success34 = supporterdata[i].Success34
        let Success35 = supporterdata[i].Success35
        let Success36 = supporterdata[i].Success36
        let Success37 = supporterdata[i].Success37
        let Success38 = supporterdata[i].Success38
        let Success39 = supporterdata[i].Success39
        let Success40 = supporterdata[i].Success40
        let Success41 = supporterdata[i].Success41
        let Success42 = supporterdata[i].Success42
        let Success43 = supporterdata[i].Success43
        let Success44 = supporterdata[i].Success44

        let pc_Target1 = supporterdata[i].pc_Target1
        let pc_Target2 = supporterdata[i].pc_Target2
        let pc_Target3 = supporterdata[i].pc_Target3
        let pc_Target4 = supporterdata[i].pc_Target4
        let pc_Target5 = supporterdata[i].pc_Target5
        let pc_Target6 = supporterdata[i].pc_Target6
        let pc_Target7 = supporterdata[i].pc_Target7
        let pc_Target8 = supporterdata[i].pc_Target8
        let pc_Target9 = supporterdata[i].pc_Target9
        let pc_Target10 = supporterdata[i].pc_Target10
        let pc_Target11 = supporterdata[i].pc_Target11
        let pc_Target12 = supporterdata[i].pc_Target12
        let pc_Target13 = supporterdata[i].pc_Target13
        let pc_Target14 = supporterdata[i].pc_Target14
        let pc_Target15 = supporterdata[i].pc_Target15
        let pc_Target16 = supporterdata[i].pc_Target16
        let pc_Target17 = supporterdata[i].pc_Target17
        let pc_Target18 = supporterdata[i].pc_Target18
        let pc_Target19 = supporterdata[i].pc_Target19
        let pc_Target20 = supporterdata[i].pc_Target20
        let pc_Target21 = supporterdata[i].pc_Target21
        let pc_Target22 = supporterdata[i].pc_Target22
        let pc_Target23 = supporterdata[i].pc_Target23
        let pc_Target24 = supporterdata[i].pc_Target24
        let pc_Target25 = supporterdata[i].pc_Target25
        let pc_Target26 = supporterdata[i].pc_Target26
        let pc_Target27 = supporterdata[i].pc_Target27
        let pc_Target28 = supporterdata[i].pc_Target28
        let pc_Target29 = supporterdata[i].pc_Target29
        let pc_Target30 = supporterdata[i].pc_Target30
        let pc_Target31 = supporterdata[i].pc_Target31
        let pc_Target32 = supporterdata[i].pc_Target32
        let pc_Target33 = supporterdata[i].pc_Target33
        let pc_Target34 = supporterdata[i].pc_Target34
        let pc_Target35 = supporterdata[i].pc_Target35
        let pc_Target36 = supporterdata[i].pc_Target36
        let pc_Target37 = supporterdata[i].pc_Target37
        let pc_Target38 = supporterdata[i].pc_Target38
        let pc_Target39 = supporterdata[i].pc_Target39
        let pc_Target40 = supporterdata[i].pc_Target40
        let pc_Target41 = supporterdata[i].pc_Target41
        let pc_Target42 = supporterdata[i].pc_Target42
        let pc_Target43 = supporterdata[i].pc_Target43
        let pc_Target44 = supporterdata[i].pc_Target44

        let Barrier11 = supporterdata[i].Barrier11
        let Barrier12 = supporterdata[i].Barrier12
        let Barrier13 = supporterdata[i].Barrier13
        let Barrier14 = supporterdata[i].Barrier14
        let Barrier15 = supporterdata[i].Barrier15
        let Barrier16 = supporterdata[i].Barrier16
        let Barrier17 = supporterdata[i].Barrier17
        let Barrier18 = supporterdata[i].Barrier18
        let Barrier19 = supporterdata[i].Barrier19
        let Barrier110 = supporterdata[i].Barrier110
        let Barrier111 = supporterdata[i].Barrier111
        let Barrier112 = supporterdata[i].Barrier112
        let Barrier113 = supporterdata[i].Barrier113
        let Barrier114 = supporterdata[i].Barrier114
        let Barrier115 = supporterdata[i].Barrier115
        let Barrier116 = supporterdata[i].Barrier116
        let Barrier117 = supporterdata[i].Barrier117
        let Barrier118 = supporterdata[i].Barrier118
        let Barrier119 = supporterdata[i].Barrier119
        let Barrier120 = supporterdata[i].Barrier120
        let Barrier121 = supporterdata[i].Barrier121
        let Barrier122 = supporterdata[i].Barrier122
        let Barrier123 = supporterdata[i].Barrier123
        let Barrier124 = supporterdata[i].Barrier124
        let Barrier125 = supporterdata[i].Barrier125
        let Barrier126 = supporterdata[i].Barrier126
        let Barrier127 = supporterdata[i].Barrier127
        let Barrier128 = supporterdata[i].Barrier128
        let Barrier129 = supporterdata[i].Barrier129
        let Barrier130 = supporterdata[i].Barrier130
        let Barrier131 = supporterdata[i].Barrier131
        let Barrier132 = supporterdata[i].Barrier132
        let Barrier133 = supporterdata[i].Barrier133
        let Barrier134 = supporterdata[i].Barrier134
        let Barrier135 = supporterdata[i].Barrier135
        let Barrier136 = supporterdata[i].Barrier136
        let Barrier137 = supporterdata[i].Barrier137
        let Barrier138 = supporterdata[i].Barrier138
        let Barrier139 = supporterdata[i].Barrier139
        let Barrier140 = supporterdata[i].Barrier140
        let Barrier141 = supporterdata[i].Barrier141
        let Barrier142 = supporterdata[i].Barrier142
        let Barrier143 = supporterdata[i].Barrier143
        let Barrier144 = supporterdata[i].Barrier144

        let score1 = supporterdata[i].score1
        let score2 = supporterdata[i].score2
        let score3 = supporterdata[i].score3
        let score4 = supporterdata[i].score4
        let score5 = supporterdata[i].score5
        let score6 = supporterdata[i].score6
        let score7 = supporterdata[i].score7
        let score8 = supporterdata[i].score8
        let score9 = supporterdata[i].score9
        let score10 = supporterdata[i].score10
        let score11 = supporterdata[i].score11
        let score12 = supporterdata[i].score12
        let score13 = supporterdata[i].score13
        let score14 = supporterdata[i].score14
        let score15 = supporterdata[i].score15
        let score16 = supporterdata[i].score16
        let score17 = supporterdata[i].score17
        let score18 = supporterdata[i].score18
        let score19 = supporterdata[i].score19
        let score20 = supporterdata[i].score20
        let score21 = supporterdata[i].score21
        let score22 = supporterdata[i].score22
        let score23 = supporterdata[i].score23
        let score24 = supporterdata[i].score24
        let score25 = supporterdata[i].score25
        let score26 = supporterdata[i].score26
        let score27 = supporterdata[i].score27
        let score28 = supporterdata[i].score28
        let score29 = supporterdata[i].score29
        let score30 = supporterdata[i].score30
        let score31 = supporterdata[i].score31
        let score32 = supporterdata[i].score32
        let score33 = supporterdata[i].score33
        let score34 = supporterdata[i].score34
        let score35 = supporterdata[i].score35
        let score36 = supporterdata[i].score36
        let score37 = supporterdata[i].score37
        let score38 = supporterdata[i].score38
        let score39 = supporterdata[i].score39
        let score40 = supporterdata[i].score40
        let score41 = supporterdata[i].score41
        let score42 = supporterdata[i].score42
        let score43 = supporterdata[i].score43
        let score44 = supporterdata[i].score44
        if (supcode == code) {
          let clearcode = supcode;
          // 
          // console.log(j +" : SupportCode :"+ SUPNAME +"รหัสนักส่งเสริม : "+ clearcode); 
          document.getElementById("passcode").innerHTML = Partcode;
          document.getElementById("supzone").innerHTML = SUPZONE;
          document.getElementById("supname").innerHTML = clearcode + '  ' + SUPNAME;

        }
        j++;
      }
    });
  }

  Getsupportertdata() {
    $.getJSON("https://asia-southeast2-brr-farmluck.cloudfunctions.net/dbcps/select_periods6465", function (data) {
      var i, j = 1;
      var supportdata = '';
      let newdata = data.recordsets[0];
      // let daterec = data.recordset[].DateAudit;
      for (i = 0; i < newdata.length; i++) {

        let Partcode = newdata[i].Partcode;
        let SUPZONE = newdata[i].SUPZONE;
        let supcode = newdata[i].supcode;
        let SUPNAME = newdata[i].SUPNAME;
        let cnt_areas_all = newdata[i].cnt_areas_all;
        let cnt_areas_y = newdata[i].cnt_areas_y;

        let cnt_p1 = newdata[i].cnt_p1;
        let pc_cnt_p1 = newdata[i].pc_cnt_p1;
        let cnt_p2 = newdata[i].cnt_p2;
        let pc_cnt_p2 = newdata[i].pc_cnt_p2;
        let cnt_p3 = newdata[i].cnt_p3;
        let pc_cnt_p3 = newdata[i].pc_cnt_p3;
        let cnt_p4 = newdata[i].cnt_p4;
        let pc_cnt_p4 = newdata[i].pc_cnt_p4;
        if (supcode === 'Z' && Partcode !== 'BRD') {
          supportdata += '<tr class="table-warning">' + '<td class="text-center d-print-none">' + j + '</td>'
          supportdata += '<td class="text-center">' + Partcode + '</td>'
          supportdata += '<td class="text-center">' + SUPZONE + '</td>'
          supportdata += '<td class="text-center">' + supcode + '</td>'
          supportdata += '<td class="text-center">' + SUPNAME + '</td>'
          supportdata += '<td class="text-center">' + cnt_areas_all + '</td>'
          supportdata += '<td class="text-center">' + cnt_areas_y + '</td>'
          supportdata += '<td class="text-center">' + cnt_p1 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p1 + '%</td></td>'
          supportdata += '<td class="text-center">' + cnt_p2 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p2 + '%</td></td>'
          supportdata += '<td class="text-center">' + cnt_p3 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p3 + '%</td></td>'
          supportdata += '<td class="text-center">' + cnt_p4 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p4 + '%</td></td>'
          supportdata += '</tr>';
        }

        else if (Partcode === 'BRD') {
          supportdata += '<tr class="table-danger">' + '<td class="text-center d-print-none">' + j + '</td>'
          supportdata += '<td class="text-center">' + Partcode + '</td>'
          supportdata += '<td class="text-center">' + SUPZONE + '</td>'
          supportdata += '<td class="text-center">' + supcode + '</td>'
          supportdata += '<td class="text-center">' + SUPNAME + '</td>'
          supportdata += '<td class="text-center">' + cnt_areas_all + '</td>'
          supportdata += '<td class="text-center">' + cnt_areas_y + '</td>'
          supportdata += '<td class="text-center">' + cnt_p1 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p1 + '%</td></td>'
          supportdata += '<td class="text-center">' + cnt_p2 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p2 + '%</td></td>'
          supportdata += '<td class="text-center">' + cnt_p3 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p3 + '%</td></td>'
          supportdata += '<td class="text-center">' + cnt_p4 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p4 + '%</td></td>'
          supportdata += '</tr>';
        }
        else {
          supportdata += '<tr>' + '<td class="text-center d-print-none">' + j + '</td>'
          supportdata += '<td class="text-center">' + Partcode + '</td>'
          supportdata += '<td class="text-center">' + SUPZONE + '</td>'
          supportdata += '<td class="text-center">' + supcode + '</td>'
          supportdata += '<td class="text-center">' + SUPNAME + '</td>'
          supportdata += '<td class="text-center">' + cnt_areas_all + '</td>'
          supportdata += '<td class="text-center">' + cnt_areas_y + '</td>'
          supportdata += '<td class="text-center">' + cnt_p1 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p1 + '%</td></td>'
          supportdata += '<td class="text-center">' + cnt_p2 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p2 + '%</td></td>'
          supportdata += '<td class="text-center">' + cnt_p3 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p3 + '%</td></td>'
          supportdata += '<td class="text-center">' + cnt_p4 + '&nbsp; &nbsp;|&nbsp; &nbsp;' + pc_cnt_p4 + '%</td></td>'
          supportdata += '</tr>';

        }

        j++;

      }

      $('#supportdata').append(supportdata);
      // console.log(data.recordset);
      // console.log(newdata);
    });


  }

  Getsupportdata() {

    this.spinner.show();
    let time = this.Formsupport.get('selettime').value;
    this.time = time[1];
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/kpi6465/kpiSupcode2?lotdate=2021' + time[0] + '&supcode=' + this.usercode;
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        console.log(data)
        this.supportdata = data;
        return this.supportdata;
      })
      .catch(err => { throw err });
    
    let url2 = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/kpi6465/kpiSupcode01052021?supcode=' + this.usercode;
    fetch(url2)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        console.log(data)
        this.kpi402 = data;
        return this.kpi402;
      })
      .catch(err => { throw err });


    if (time[0] === '0401' || time[0] === '0402') {
      this.before = !this.before;
      this.after = true;
    }
    else {
      this.before = true;
      this.after = false;
    }
    
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);

  }
}


