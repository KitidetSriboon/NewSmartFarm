import { Component, OnInit, Input, Pipe, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { NgxSpinnerService } from 'ngx-spinner';
import { element } from 'protractor';
import { FirebaseService } from '../../services/firebase.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})


export class AcceptComponent implements OnInit {
  // Valiable 
  @Input() zone;
  @Input() supcode;
  @Input() userlevel;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displaycolumFert3: string[] = ['supzone', 'fmname', 'intlandno', 'allow_date_th', 'ck_accept', 'accept'];

  displaycomment: string[] = ['', '', '', '', '', '', ''];
  datalistfarm;
  checkzone;
  farmerlist;
  CheckcaseOK;
  caseOK;
  Fertilizer3: FormGroup
  FormKumut: FormGroup

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

  maps: any = {};
  coordinates;
  coordinatesCenter;
  plantarea;
  keydata;
  update;
  lastSelectedInfoWindow: any;
  infordata2;
  comment;


  FormRepair: FormGroup

  constructor(private spinner: NgxSpinnerService, private router: Router, private firebaseService: FirebaseService) {


    this.Fertilizer3 = new FormGroup({
      farmercode: new FormControl(),
      zonecode: new FormControl(),
    });

    this.FormKumut = new FormGroup({
      seletroot: new FormControl(),
      seletzone: new FormControl(Validators.required),
      dataaction: new FormControl(Validators.required),
      nr1big: new FormControl(Validators.required),
      nr1mid: new FormControl(Validators.required),
      nr1small: new FormControl(Validators.required),
      nr2big: new FormControl(Validators.required),
      nr2mid: new FormControl(Validators.required),
      nr2small: new FormControl(Validators.required),
      nr3big: new FormControl(Validators.required),
      nr3mid: new FormControl(Validators.required),
      nr3small: new FormControl(Validators.required),
      massbig: new FormControl(Validators.required),
      massmid: new FormControl(Validators.required),
      masssmall: new FormControl(Validators.required),

      heightbig: new FormControl(Validators.required),
      heightmid: new FormControl(Validators.required),
      heightsmall: new FormControl(Validators.required),
      diameterbig: new FormControl(Validators.required),
      diametermid: new FormControl(Validators.required),
      diametersmall: new FormControl(Validators.required),
    });



  }
  today = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
  dateTime = this.date + ' ' + this.time;
  orther = true;
  manager = true;
  headmanager = true;
  Allacceptdata;
  AllowFert3;
  MAllowFert3;
  HAllowF3;
  Alldataaollowfert3;
  dataSource;
  // ระบบหลัก 
  decryptedInfo;
  ngOnInit(): void {
    let data = localStorage.getItem('userdata');
    var deData = CryptoJS.AES.decrypt(decodeURIComponent(data), 'bsfdev');
    this.decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    this.supcode = this.decryptedInfo.alldata[0].supcode;
    this.zone = this.decryptedInfo.alldata[0].zonedata;
    this.userlevel =  this.decryptedInfo.alldata[0].userlevel;

    if (this.userlevel === '14' || this.userlevel === '15') {
      this.manager = false;
      this.orther = false;
    }
    if (this.userlevel === '11' || this.userlevel === '12') {
      this.manager = true;
      this.orther = false;
      this.headmanager = false;
    }
    
    this.checkzone = this.zone;
    // console.log(this.zone);
    setTimeout(() => {
    this.GetFarmerinzone();
    this.GetComment();
    this.LoadAcceptdata();
    this.ListAllorFert3();
    }, 3500);
    


  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  /// อนุมัติ S=>Y
  AcceptFertilizer3(idland, fmcode) {
    // console.log(idland);
    let accept_id = 2;
    if (this.supcode != 923) {
      accept_id = 3;
      if (confirm('ต้องการบันทึกข้อมูลหรือไม่?')) {
        // Save it!
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var myArr = this.responseText.split("|");
            if (myArr[0] == "Y") {
              alert('(^-^) บันทึกข้อมูลเรียบร้อยแล้ว')
            } else {
              // alert('!! การอัพเดตสำเร็จ')
            }
          }
        };
        xmlhttp.open("post", "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/updategetFert3?itid=" + idland + "&getFert3=Y", true);
        xmlhttp.send();

        xmlhttp.open("post", "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/insert_ckGetfert3?itid='" + idland + "'"
          + "&fmcode='" + fmcode + "'"
          + "&supcode='" + this.supcode + "'"
          + "&supzone='" + this.zone + "'"
          + "&accept_date='" + this.dateTime + "'"
          + "&allow_date='" + this.dateTime + "'"
          + "&comment=''"
          + "&ck_accept=" + accept_id
          + "&year='2122'", true);
        xmlhttp.send();

        alert('(^-^) บันทึกข้อมูลการอนุมัติเรียบร้อยแล้ว');
        // location.reload();
        this.GetFarmerFertilizer3();
        this.LoadAcceptdata();
        console.log('Thing was saved to the database.');
      } else {
        // Do nothing!
        console.log('no update');
      }
    }
    if (this.supcode == 923) {
      if (confirm('ต้องการบันทึกข้อมูลหรือไม่?')) {
        // Save it!
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var myArr = this.responseText.split("|");
            if (myArr[0] == "Y") {
              alert('(^-^) บันทึกข้อมูลเรียบร้อยแล้ว')
            } else {
              // alert('!! การอัพเดตสำเร็จ')
            }
          }
        };
        xmlhttp.open("post", "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/set_acceptTo2?itid=" + idland, true);
        xmlhttp.send();
        alert('(^-^) บันทึกข้อมูลการอนุมัติเรียบร้อยแล้ว');
        // location.reload();
        this.GetFarmerFertilizer3();
        this.LoadAcceptdata();
        this.ListAllorFert3();
        console.log('Thing was saved to the database.');
      } else {
        // Do nothi
        alert('(^-^) ยกเลิกรายการแล้ว');
      }
    }



  }
  /// ขออนุมัติ S=> A
  Allowrequest(itid, fmcode) {
    console.log(fmcode);

    if (confirm('ต้องการบันทึกข้อมูลหรือไม่?')) {
      // Save it!
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var myArr = this.responseText.split("|");
          if (myArr[0] == "Y") {
            alert('(^-^) บันทึกข้อมูลเรียบร้อยแล้ว')
          } else {
            // alert('!! การอัพเดตสำเร็จ')
          }
        }
      };
      xmlhttp.open("post", "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/updategetFert3?itid=" + itid + "&getFert3=A", true);
      xmlhttp.send();
      xmlhttp.open("post", "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/insert_ckGetfert3?itid='" + itid + "'"
        + "&fmcode='" + fmcode + "'"
        + "&supcode='" + this.supcode + "'"
        + "&supzone='" + this.zone + "'"
        + "&accept_date='" + this.dateTime + "'"
        + "&allow_date='" + this.dateTime + "'"
        + "&comment=''"
        + "&ck_accept=1"
        + "&year='2122'", true);
      xmlhttp.send();
      alert('(^-^) บันทึกข้อมูลการขออนุมัติเรียบร้อยแล้ว');
      // location.reload();
      this.GetFarmerFertilizer3();
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('no update');
    }
  }

  FilterData(event: Event) {
    const filterValue2 = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue2.trim().toLowerCase();;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ListAllorFert3() {
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/v_ckGetfert3Toaccept';
    axios
      .get(url)
      .then((res) => {
        // console.log(res);
        const data = res.data.recordsets[0].filter(el => el.ck_accept == 1 && el.allow_date_th != null);

        this.dataSource = new MatTableDataSource(data);
      }).catch(err => { throw err });
  }

  // เลือกชาวไร่จากโซนร
  GetFarmerinzone() {
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/fmInzone?supzone=' + this.zone;
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];

        // console.log(data)
        if (data.leght == 0) { alert("ยังไม่มีข้อมูลดังกล่าว || ลองใหม่อีกครั้ง"); }
        else {
          this.farmerlist = data;
        }

        return this.farmerlist;
      })
      .catch(err => { throw err });
  }
  // เลือกชาวไร่จากโซนร ผอ ผช
  GetFarmerList() {
    let zone = this.Fertilizer3.get('zonecode').value;
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/fmInzone?supzone=' + zone;
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        // console.log(data)
        if (data.leght == 0) { alert("ยังไม่มีข้อมูลดังกล่าว || ลองใหม่อีกครั้ง"); }
        else {
          this.farmerlist = data;
        }

        return this.farmerlist;
      })
      .catch(err => { throw err });
  }

  GetFarmerFertilizer3() {
    let data = (this.Fertilizer3.get('farmercode').value).substring(10, 0);
    let query = '';
    console.log('fmcode : ' + data);
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/v_cp6465_getFert3?fmcode=' + data;
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        // let all =  data.filter(element => element.toLowerCase().indexOf(query.toLowerCase()) !== -1)
        console.log(data);
        if (data.length == 0) {
          alert("ยังไม่มีข้อมูลชาวไร่ชื่อนี้");
        }
        else { this.datalistfarm = data; }
        return this.datalistfarm;
      })
      .catch(err => { throw err });


  }

  // Load ข้อมูลปุ๋ยทีอนุมัติแล้ว
  LoadAcceptdata() {


    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/v_ckGetfert3Toaccept";
    fetch(url)
      .then(res => res.json())
      .then((response: any) => {
        const data = response.recordsets[0];

        this.Allacceptdata = data.filter(element => element.ck_accept == 2);


        // return console.log( this.Allacceptdata);
        // this.Allacceptdata = data.filter(element => element.ck_accept == 2);
      }).catch(err => { throw err });


  }



  // งานอาจารย์กุมุท'
  SubmitDataK() {

    let landitid = (<HTMLInputElement>document.getElementById('landitid2')).value;
    let landno = (<HTMLInputElement>document.getElementById('landno2')).value;
    let fmcode = (<HTMLInputElement>document.getElementById('fmcode2')).value;
    // let landitid = this.FormTrackActionLand.get('landitid').value;
    // let landno = this.FormTrackActionLand.get('landno').value;
    let dataaction = this.FormKumut.get('dataaction').value;
    let nr1big = this.FormKumut.get('nr1big').value;
    let nr1mid = this.FormKumut.get('nr1mid').value;
    let nr1small = this.FormKumut.get('nr1small').value;

    let nr2big = this.FormKumut.get('nr2big').value;
    let nr2mid = this.FormKumut.get('nr2mid').value;
    let nr2small = this.FormKumut.get('nr2small').value;

    let nr3big = this.FormKumut.get('nr3big').value;
    let nr3mid = this.FormKumut.get('nr3mid').value;
    let nr3small = this.FormKumut.get('nr3small').value;

    let massbig = this.FormKumut.get('massbig').value;
    let massmid = this.FormKumut.get('massmid').value;
    let masssmall = this.FormKumut.get('masssmall').value;

    let heightbig = this.FormKumut.get('heightbig').value;
    let diameterbig = this.FormKumut.get('diameterbig').value;
    let heightmid = this.FormKumut.get('heightmid').value;

    let diametermid = this.FormKumut.get('diametermid').value;
    let heightsmall = this.FormKumut.get('heightsmall').value;
    let diametersmall = this.FormKumut.get('diametersmall').value;

    if (confirm('ต้องการบันทึกข้อมูลหรือไม่?')) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var myArr = this.responseText.split("|");
          if (myArr[0] == "Y") {
            alert('(^-^) บันทึกข้อมูลเรียบร้อยแล้ว')
          } else {
            // alert('!! การอัพเดตสำเร็จ')
          }
        }
      };
      xmlhttp.open("post", "https://asia-southeast2-brr-farmluck.cloudfunctions.net/kumut/insertEstimate_yld?prodyear='2021'"
        + "&supcode='" + this.supcode + "'"
        + "&supzone='" + this.zone + "'"
        + "&fmcode='" + fmcode + "'"
        + "&nr1big=" + nr1big
        + "&nr1mid=" + nr1mid
        + "&nr1small=" + nr1small
        + "&nr2big=" + nr2big
        + "&nr2mid=" + nr2mid
        + "&nr2small=" + nr2small
        + "&nr3big=" + nr3big
        + "&nr3mid=" + nr3mid
        + "&nr3small=" + nr3small
        + "&massbig=" + massbig
        + "&massmid=" + massmid
        + "&masssmall=" + masssmall

        + "&heightsmall=" + heightsmall
        + "&heightmid=" + heightmid
        + "&heightbig=" + heightbig
        + "&diameterbig=" + diameterbig
        + "&diametersmall=" + diametersmall
        + "&diametermid=" + diametermid

        + "&itid='" + landitid + "'"
        + "&intlandno='" + landno + "'"
        + "&est_date='" + dataaction + "'", true);
      xmlhttp.send();

      alert('บันทึกข้อมูลเรียบร้อย ^_^!');
      console.log('update db');
      // this.GetComment();
    }
    else {
      console.log('no update');
    }

    this.GetComment();
    // window.location.href = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/kumut/insertEstimate_yld?prodyear='2021'"
    // +"&supcode='"+  this.supcode  + "'"
    // +"&supzone='"+ this.zone + "'"
    // +"&fmcode='"+  fmcode  + "'"
    // +"&nr1big="+ nr1big
    // +"&nr1mid="+ nr1mid
    // +"&nr1small="+ nr1small
    // +"&nr2big="+ nr2big
    // +"&nr2mid="+ nr2mid
    // +"&nr2small="+ nr2small
    // +"&nr3big="+ nr3big
    // +"&nr3mid="+ nr3mid
    // +"&nr3small="+ nr3small
    // +"&massbig="+ massbig
    // +"&massmid="+ massmid
    // +"&masssmall="+ masssmall
    // +"&itid='" + landitid  + "'"
    // +"&intlandno='" + landno  +  "'"
    // +"&est_date='"+ dataaction +"'";
  }

  Supportname;
  GetComment() {

    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/kumut/auditData?supcode=' + this.supcode;
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        this.comment = data;

      })
      .catch(err => { throw err });



  }

  getinforwindows(key, infoWindow) {
    console.log(key);
    if (infoWindow == this.lastSelectedInfoWindow) {
      return;
    }
    if (this.lastSelectedInfoWindow != null) {
      try {
        this.lastSelectedInfoWindow.close();
      } catch { } //in case if you reload your markers
    }
    this.lastSelectedInfoWindow = infoWindow;
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/dbcps/getlandnobyitid?itid=' + key + '';
    // this.spinner.show();
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        var itid = out.recordset[0].itid;
        var landno = out.recordset[0].intlandno;
        var fmcode = out.recordset[0].fmcode;
        $('#itid2').val(itid.toString());
        $('#landno2').val(landno.toString());
        $('#fmcode2').val(fmcode.toString());
        // alert(a); 
        // console.log('DATA From SQL:.=>', data);     
        this.infordata2 = data;
      })
      .catch(err => { throw err });
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3000);
  }

  getMap2() {

    let root = this.FormKumut.get('seletroot').value;
    let zone = this.FormKumut.get('seletzone').value;
    console.log(zone);
    console.log(root);
    if (root == null || root === '' || zone == null || zone === '') { alert('กรุณาระบุ โซน / รูทก่อนค้นหา'); }
    // // console.log(root);
    else {
      this.spinner.show();
      this.firebaseService.getmapByroute('2122', zone, root)
        .then((maps: any) => {
          // console.log(maps)
          this.maps = maps;
          this.keydata = this.maps.key
          this.plantarea = this.maps.AreaPre;
          this.coordinates = this.maps[0].coordinates
          this.coordinatesCenter = this.maps[0].coordinatesCenter
          this.update = new Date(this.maps[0].updDt).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          })
          setTimeout(() => {
            this.spinner.hide();
          }, 5000);
          // return this.maps;
          // console.log(this.maps);
        });
    }
  }

  DeletecComemmt(idst) {
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/kumut/canceled_estimate_yld?idest=" + idst;
    if (confirm("ต้องการลบข้อมูลหรือไม่ ?")) {
      axios
        .post(url)
        .then(res => {
          console.log(res);
        })
        .catch(error => { console.log(error) })
    }
    else {
      console.log('no update');
    }

  }
  // งานอาจารย์กุมุท
  TEST(itid, fmcode) {
    console.log(itid);
    console.log(fmcode);
  }

}

