import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import axios from "axios"
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Authenticationservice } from '../../services/authentication.service';

@Component({
  selector: 'app-repairgroup',
  templateUrl: './repairgroup.component.html',
  styleUrls: ['./repairgroup.component.css']
})
export class RepairgroupComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataGroupSource;
  ColumGroupSource: string[] = ['categoryGroup', 'category_docs', 'groupname', 'qdesc', 'h_fmcode', 'h_fmname', 'position_docs', 'supzone', 'supcode','canePerDay', 'dateAdd_th', 'dateUpdate_th', 'editdata'];
  // ColumsGroup: string [] = ['groupcode','grouptype','groupname','headercode','headername','positioningroup','supcode'];

  dataGroupSourceM;
  dataGroupSourceH;
  ColumnGroupM: string[] = ['supzone', 'categoryGroup', 'category_docs', 'fmcode', 'fmname', 'position_docs', 'brand', 'Tools_docs', 'horsepower', 'comment', 'canePerDay', 'dateUpdate_th', 'editdata'];
  ColumnGroupH: string[] = ['supzone', 'categoryGroup', 'category_docs', 'qdesc', 'fmcode', 'fmname', 'position_docs', 'Tools_docs', 'horsepower', 'comment', 'canePerDay', 'dateUpdate_th', 'editdata'];
  select_list = 1;
  showformH = false;
  showformM = true;
  // ตัวแปรภายใน Component
  constructor(private spinner: NgxSpinnerService, private auth: Authenticationservice) {
    // สำหรับบันทึกข้อมูล
    this.FormRepair = new FormGroup({ 
      // address 
      farmname: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      provinces: new FormControl('', Validators.required),
      subdistrict: new FormControl('', Validators.required), // county
      tel: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      NAMEMOO: new FormControl('', Validators.required),
      MOO: new FormControl('', Validators.required),
      HOMENO: new FormControl('', Validators.required),
      fmname: new FormControl('', Validators.required),
      fmcode: new FormControl(),
      h_fmname: new FormControl('', Validators.required),
      h_fmcode: new FormControl(),
      groupcode: new FormControl('', Validators.required),
      fmdata: new FormControl(),
      // address 
      groupcheck: new FormControl('', Validators.required),
      idzone: new FormControl(),
      groupname: new FormControl('', Validators.required),
      grouptype: new FormControl(),
      grouptype2: new FormControl(),
      position: new FormControl('', Validators.required),
      groupid: new FormControl(),
      supcode: new FormControl(),
      year: new FormControl(),

      canePerDay: new FormControl(),
      Tools: new FormControl(),
      comment: new FormControl(),
      MainTools: new FormControl(),
      brand: new FormControl(),
      horsepower: new FormControl(),
      Model_brand: new FormControl(),

      humancanperday: new FormControl(),
      product_year: new FormControl(),
      possess_year: new FormControl(),
      carboardnumber: new FormControl(),
      swapwork:new FormControl(),
    });

    // สำหรับแก้ไขกลุ่ม
    this.FormEditRepair = new FormGroup({
      groupnameedit: new FormControl(),
      hcodeedit: new FormControl(),
      hnameedit: new FormControl(),
      zoneedit: new FormControl(),
      supcodeedit: new FormControl(),

      subcanePerDay: new FormControl(),
      subTools: new FormControl(),
      subposition: new FormControl(),
      subtell: new FormControl(),
      subname: new FormControl(),
      subcode: new FormControl(),
      subcomment: new FormControl(),
      subbrand: new FormControl(),
      subhosepower: new FormControl(),
      subModel_brand: new FormControl(),

      subpossess_year: new FormControl(),
      subproduct_year: new FormControl(),
      subcarboardnumber: new FormControl(),
      subworker: new FormControl(),
    });
  }
  FormRepair: FormGroup
  /// แก้ไชช้อมูลกลุ่ม
  FormEditRepair: FormGroup
  Olddata;
  oldgroupname; oldhcode; oldhname; oldsupcode; oldsupzone; oldposition_docs; old_Tools_docs; subhorsepower; old_brand;
  Oldsupdata;
  subcode; subname; subtell; subcanePerDay; subModel_brand;
  Hshow = true; Mshow = true;
  ///1
  provinces; district; subdistrict; zonegroup; groupname;
  allow = true; addgroup; homegroup = true;
  repairgroup; allsubgroup; maxNumH1; maxNumH2; maxNumH3; maxNumH4; maxNumM;
  zone2H; zoneM; AllZone; dataforadd;
  showzoneH = true; showzoneM = true; showAllZone = false;;
  farmmerdatalist;

  //// ข้อมูลชาวไร่
  farmername; farmernamecode; fmhomeno;
  fmmoo; fmnamemoo; fmdistrict; fmcounty;
  fmprovince; fmtel; fmzip;decryptedInfo;
  supcode;
  ngOnInit(): void {
    let userdata;
    userdata = this.auth.Authention();
    this.supcode = userdata.supcode;
    this.Loadgroupcutqueue();
    this.FormRepair.get('groupcheck').setValue(1);
    this.FormRepair.get('grouptype').setValue('N');
    this.FormEditRepair.get('subworker').setValue(0);
    setTimeout(() => {
    this.Loadzonegroup();
    this.Getdatagrouptype();
    this.LoadBrandCar();
    this.Getsupgroupdate();
    this.Change(1);
    this.MainToolsSelectH();
    this.MainToolsSelectM();
    this.GetGroupBoard();
    this.GetCanperday();
    this.GetAllGroup();
    this.Loadchart();
    }, 3000);
    this.dataGroupSource.paginator = this.paginator;
    this.dataGroupSource.sort = this.sort;
  }

  ngAfterViewInit() {
  }
  /// ค้นหาข้อมูลในตารางกลุ่ม
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataGroupSource.filter = filterValue.trim().toLowerCase();;
    if (this.dataGroupSource.paginator) {
      this.dataGroupSource.paginator.firstPage();
    }
  }
  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataGroupSourceH.filter = filterValue.trim().toLowerCase();;
    if (this.dataGroupSourceH.paginator) {
      this.dataGroupSourceH.paginator.firstPage();
    }
  }
  applyFilter4(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataGroupSourceM.filter = filterValue.trim().toLowerCase();;
    if (this.dataGroupSourceM.paginator) {
      this.dataGroupSourceM.paginator.firstPage();
    }
  }
  /// ค้นหาข้อมูลในตารางกลุ่ม

  // จัดการโหลดข้อมูลกลุ่มย่อย หลัก
  Getdatagrouptype() {
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode';
    axios.get(url)
      .then((out: any) => {
        const data = out.data.recordsets[0];
        let AllZone = data.filter(element => element.position == 0 && element.h_fmname !== null)
        this.dataGroupSource = new MatTableDataSource(AllZone);
      })
      .catch(err => { throw err });
  }
  // โหลดข้อมูลกลุ่มหลัก
  Getsupgroupdate() {
    axios.get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode_n0")
      .then((out: any) => {
        const data = out.data.recordsets[0];
        let Hzone = data.filter(element => element.category.trim() === 'H' && element.position != 0)
        let Mzone = data.filter(element => element.category.trim() === 'M' && element.position != 0)

        this.dataGroupSourceM = new MatTableDataSource(Mzone);
        this.dataGroupSourceH = new MatTableDataSource(Hzone);
      })
      .catch(err => { throw err });
  }
  // จัดการ tab 
  swapshow() {
    let value = this.FormRepair.get("groupcheck").value;
    // console.log(value);
    if (value == 1) { this.showzoneH = true; this.showzoneM = true; this.showAllZone = false; }
    else if (value == 2) { this.showzoneH = false; this.showzoneM = true; this.showAllZone = true; }
    else if (value == 3) { this.showzoneH = true; this.showzoneM = false; this.showAllZone = true; }
    else { this.showzoneH = true; this.showzoneM = true; this.showAllZone = false; }
  }
  // จัดการข้อมูลกลุ่ม 
  alltypegroup=false;
  addgroupmain=true;
  addsubgroup=true;
  swapwork(){
    let id = this.FormRepair.get('swapwork').value;
    if (id == 1)
    {
      this.alltypegroup = false;
      this.addgroupmain = true;
      this.addsubgroup = true;
    }
    if (id == 2)
    {
      this.alltypegroup = true;
      this.addgroupmain = false;
      this.addsubgroup = true;
    }
    if (id == 3)
    {
      this.alltypegroup = true;
      this.addgroupmain = true;
      this.addsubgroup = false;
    }
  }
  // สลับข้อมูลตารางแสดงหลักย่อย
  Swaptab(check) {
    if (check == 4) {
      this.homegroup = true;
      this.addgroup = false;
      this.allsubgroup = false;
      this.repairgroup = false;
      document.getElementById("homegroup").style.display = "block";
      document.getElementById("addgroup").style.display = "none";
    }
    else if (check == 1) {
      this.homegroup = false;
      this.addgroup = true;
      this.allsubgroup = false;
      this.repairgroup = false;
      document.getElementById("homegroup").style.display = "none";
      document.getElementById("addgroup").style.display = "block";
    }
    

  }
  // แสดงกลุ่มตัด หรือ กลุ่มบำรุง
  showformH12;
  Change(item) {
    let Hzone;
    let Mzone;
    axios.get('https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode')
      .then((out: any) => {
        const data = out.data.recordsets[0];
        let H2zone = data.filter(element => element.category.trim() === 'H' && element.groupname != null && element.position == 0)
        let M2zone = data.filter(element => element.category.trim() === 'M' && element.groupname != null && element.position == 0)
        Hzone = H2zone;
        Mzone = M2zone;
        // console.log(Hzone);
        if (item == 1) { this.showformH12 = false; this.showformM = true; this.dataforadd = Hzone; }
        else if (item == 2) { this.showformH12 = true; this.showformM = false; this.dataforadd = Mzone; }
      })
      .catch(err => { throw err });
    this.FormRepair.get('groupname').setValue('');
    this.Getdatagrouptype();
    this.Getsupgroupdate();
    // console.log(this.dataforadd);
  }
  // เอาข้อมูลขึ้นแสดงใน Form
  selectsupfmname() {
    let data = this.FormRepair.get('fmdata').value;
    this.farmername = data[1];
    this.farmernamecode = data[0];
    this.fmhomeno = data[2];
    this.fmnamemoo = data[3];
    this.fmmoo = data[4];
    this.fmdistrict = data[5];
    this.fmcounty = data[6];
    this.fmprovince = data[7];
    this.fmtel = data[8];
    this.fmzip = data[9];
    console.log(data);
  }



  // โหลดข้อมูลกลุ่มโซน
  Loadzonegroup() {

    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/zoneGroup';
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        this.zonegroup = data;
        return this.zonegroup;
      })
      .catch(err => { throw err });
  }

  selectGroupTypeOption(check: string) {

    let grouptype = String(this.FormRepair.get('grouptype').value);
    // console.log(this.maxNumM);
    if (check === 'H') {
      this.allow = false;
      this.groupname = grouptype;
    }

    else if (check === 'M') {
      this.allow = true;
      this.groupname = grouptype;
    }
  }
  // รหัสกลุ่ม
  selectGroupOption2() {
    let idzone = this.FormRepair.get('idzone').value;
    let grouptype2 = this.FormRepair.get('grouptype2').value;
    this.maxNumM = idzone[1];
    let grouptype = String(this.FormRepair.get('grouptype').value);
    let lastgroupname = this.groupname;
    this.groupname = this.groupname.slice(0, 4);
    console.log(grouptype2);
    let gt = grouptype2[1] + grouptype2[0];
    if (grouptype === 'H') { this.groupname = this.groupname + gt; }
    else if (grouptype === 'M') { this.groupname = lastgroupname + this.maxNumM; }
  }
  // เลือกข้อมูลโซน 
  selectZone() {
    let idzone = this.FormRepair.get('idzone').value;
    let grouptype = String(this.FormRepair.get('grouptype').value);
    // console.log(idzone[0]);
    // this.groupname = this.groupname.slice(0,1)
    this.groupname = this.groupname + idzone[0];
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/zoneGroup';
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordsets[0];
        let maxh = data.filter(element => element.zone_id == idzone[0])
        console.log(maxh);
        this.maxNumH1 = maxh[0].maxNumH1;
        this.maxNumH2 = maxh[0].maxNumH2;
        this.maxNumH3 = maxh[0].maxNumH3;
        this.maxNumH4 = maxh[0].maxNumH4;
        this.maxNumM = maxh[0].this.maxNumM
      })
      .catch(err => { throw err });

    if (grouptype === 'M') {
      this.groupname = grouptype + idzone[0] + + '0' + idzone[1];
      console.log(this.groupname);
    }
    if (grouptype === 'H') { this.groupname = this.groupname; }

  }
  /// บันทึกข้อมูลกลุ่มหลัก
  SaveGrouprepair() {


    let idzone = this.FormRepair.get('idzone').value;
    let groupname = this.FormRepair.get('groupname').value;
    let grouptype = this.FormRepair.get('grouptype').value;
    let grouptype2 = this.FormRepair.get('grouptype2').value;
    let groupid = (this.FormRepair.get('groupid').value).slice(1, 7);
    let supcode = this.FormRepair.get('supcode').value;
    let h_fmname = this.FormRepair.get("h_fmname").value
    let h_fmcode = this.FormRepair.get("h_fmcode").value
    let comment = this.FormRepair.get('comment').value;
    let tel = this.FormRepair.get('tel').value;
   
    let CheckNum;
    if (groupname == '' || grouptype == '' || groupid == '' || supcode == '' || h_fmcode == '' || h_fmname == '' ||
      groupname == null || grouptype == null || groupid == null || supcode == null || h_fmcode == null || h_fmname == null) { alert('กรุณากรอกข้อมูลให้ครบทุกช่อง'); }
    else {
      if (grouptype2 === null) { grouptype2 = '0'; } else { grouptype2 = grouptype2.slice(1, 2); }
      if (grouptype === "M") { CheckNum = idzone[1]; }
      else if (grouptype === "H" && grouptype2[0] == 1) { CheckNum = idzone[2]; }
      else if (grouptype === "H" && grouptype2[0] == 2) { CheckNum = idzone[3]; }
      else if (grouptype === "H" && grouptype2[0] == 3) { CheckNum = idzone[4]; }
      else if (grouptype === "H" && grouptype2[0] == 4) { CheckNum = idzone[5]; }
      if (groupname === '') { alert("กรุณากรอกชื่อกลุ่ม"); }

      // console.log("maxNum M ="+ maxNumM);
      else {
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
          xmlhttp.open("post", "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/insertGroupcode?"
            + "year='2122'"
            + "&h_fmcode='" + h_fmcode + "'" // รหัสหัวหน้ากลุ่ม
            + "&h_fmname='" + h_fmname + "'" // ชื่อหัวหน้ากลุ่ม
            + "&category='" + grouptype + "'"
            + "&qtype='" + grouptype2 + "'"
            + "&groupname='" + groupname + "'"
            + "&supzone='" + idzone[6] + "'"
            + "&groupcode='" + groupid.trim() + "'"
            + "&supcode='" + supcode + "'"
            + "&numOfZone='" + groupid.trim().slice(5, 6) + "'"
            + "&position='0'"
            + "&tel='" + tel +"'"
            + "&comment='" + comment + "'"
            , true);
          xmlhttp.send();
          alert('บันทึกข้อมูลเรียบร้อย ^_^!');
          console.log('update db');
          $('input[type="text"]').val('');
          $("#datazone").prop('selectedIndex', -1)
          $("#grouptype").prop('selectedIndex', -1)
          $("#grouptype2").prop('selectedIndex', -1)
          this.Loadzonegroup();
          this.Getdatagrouptype();
          this.Getsupgroupdate();
          // this.GetComment();
        }
        else { console.log('no update'); }
      }
    }
  }
  /// จัดการช่องกรอกข้อมูล
  ClearTEXT() {
    $('#group').val('');
    $('input[type="text"]').val('');
    $("#datazone").prop('selectedIndex', -1)
    $("#grouptype").prop('selectedIndex', -1)
    $("#grouptype2").prop('selectedIndex', -1)
    this.groupname = '';
    this.FormEditRepair.get('subTools').setValue('');
    this.FormRepair.get('Tools').setValue('');
    this.FormRepair.get('MainTools').setValue('');
  }

  // โหลดข้อมูลชาวไร่
  getfarmmerdata() {
    let text = this.FormRepair.get('farmname').value;
    let fmdata = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/farmer_basicByfmcode?text_fm=' + text + '';
    this.spinner.show();
    fetch(fmdata)
      .then(res => res.json())
      .then((out: any) => {
        const data = out.recordset;
        this.farmmerdatalist = data;
        console.log(this.farmmerdatalist[0]);
      })
      .catch(err => { throw err });
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }
  // หมวดหมู่ ตัด|ซ่อมบำรุง

  // ส่งค่าแก้ไขกลุ่มหลัก
  oldtel;
  CheckIDdata(iddata) {
    console.log(iddata);
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode';
    axios
      .get(url)
      .then(res => {
        let olddata = res.data.recordsets[0].filter(el => el.iddata == iddata);
        this.Olddata = olddata;
        this.oldgroupname = olddata[0].groupname.trim();
        this.oldhcode = olddata[0].h_fmcode.trim();
        this.oldhname = olddata[0].h_fmname.trim();
        this.oldsupcode = olddata[0].supcode.trim();
        this.oldsupzone = olddata[0].supzone.trim();
        this.oldtel = olddata[0].tel.trim();
      })
      .catch(err => {
        console.error(err)
      })
  }
  // ส่งค่าแก้ไขกลุ่มย่อย
  CheckSubIDdata(iddata, grouptype) {
    console.log(iddata);
    console.log(grouptype);
    if (grouptype.trim() === "H") {
      this.Hshow = false;
      this.Mshow = true;
    }
    else if (grouptype.trim() === "M") {
      this.Mshow = false;
      this.Hshow = true;
    }
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode';
    let url2 = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode_n0';
    axios
      .get(url2)
      .then(res => {
        let oldsupdata = res.data.recordsets[0].filter(el => el.iddata == iddata);
        this.Oldsupdata = oldsupdata;
        this.subcode = oldsupdata[0].fmcode.trim();
        this.subname = oldsupdata[0].fmname.trim();
        this.subcanePerDay = oldsupdata[0].canePerDay;
        this.subtell = oldsupdata[0].tel.trim();
        this.oldposition_docs = oldsupdata[0].position_docs.trim();
        this.subModel_brand = oldsupdata[0].Model_brand();
        this.subhorsepower = oldsupdata[0].horsepower;
      })
      .catch(err => {
        console.error(err)
      })

    axios
      .get(url2)
      .then(res => {
        let oldsupdata = res.data.recordsets[0].filter(el => el.iddata == iddata);
        this.old_brand = oldsupdata[0].brand_name;
        this.old_Tools_docs = oldsupdata[0].Tools_docs;
      })
      .catch(err => {
        console.error(err)
      })
  }

  /// บันทึกแก้ไขข้อมูลกลุ่มหลัก
  SaveEduitGroup(id) {
    let newgroupname = this.FormEditRepair.get('groupnameedit').value;
    let newHfmcode = this.FormEditRepair.get('hcodeedit').value;
    let newHmane = this.FormEditRepair.get('hnameedit').value;
    let newzone = this.FormEditRepair.get('zoneedit').value;
    let newsupcode = this.FormEditRepair.get('supcodeedit').value;
    let newtell = this.FormEditRepair.get('subtell').value
    console.log(id);
    console.log(newsupcode);
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/update_groupcode0?iddata=" + id + "&groupname=" + newgroupname + "&h_fmcode=" + newHfmcode + "&h_fmname=" + newHmane + "&supzone=" + newzone + "&supcode=" + newsupcode +"&tel='"+ newtell +"'&UpdateBY=" + this.supcode;

    if (confirm('ต้องการบันทึกข้อมูลหรือไม่?')) {
      axios
        .post(url)
        .then(response => {
          console.log("response: ", response)
          // do something about 
          if(response.data.code){alert("บันทึกข้อมูลไม่สำเร็จ");}
          else if (response.data.rrowsAffected){alert("บันทึกข้อมูลเรียบร้อยแล้วค่ะ ^^!");}
        })
        .catch(err => {
          console.error(err)
        });


    }
    else {
      alert('ยกเลิกการบันทึก');
    }
    setTimeout(() => {
      this.Getdatagrouptype();
      this.Getsupgroupdate();
    }, 500);
  }

  // บันทึกแก้ไขข้อมูลกลุ่มย่อย
  SaveEditSupGroup(id) {
    console.log(id);
    let newfmcode = this.FormEditRepair.get('subcode').value;
    let newfmname = this.FormEditRepair.get('subname').value;
    let newtell = this.FormEditRepair.get('subtell').value;
    let newposition = this.FormEditRepair.get('subposition').value;
    let newTools = this.FormEditRepair.get('subTools').value;
    let newPerday = this.FormEditRepair.get('subcanePerDay').value;
    let newComment = this.FormEditRepair.get('subcomment').value;
    let newbrand = this.FormEditRepair.get('subbrand').value;
    let newhosepower = this.FormEditRepair.get('subhosepower').value;
    let subModel_brand = this.FormEditRepair.get('subModel_brand').value;

    let product_year = this.FormEditRepair.get('subproduct_year').value;
    let possess_year = this.FormEditRepair.get('subpossess_year').value;
    let worker = this.FormEditRepair.get('subworker').value;
    let carboardnumber = this.FormEditRepair.get('subcarboardnumber').value;

    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/update_groupcode1?iddata=" + id + "&fmcode=" + newfmcode + "&fmname=" + newfmname + "&tel=" + newtell + "&position=" + newposition + "&Tools=" + newTools + "&canePerDay=" + newPerday + "&comment=" + newComment + "&brand=" + newbrand + "&horsepower=" + newhosepower + "&Model_brand=" + subModel_brand + "&product_year=" + product_year + "&possess_year=" + possess_year + "&worker=" + worker + "&reg_num=" + carboardnumber + "&UpdateBY=" + this.supcode;
    if (confirm('ต้องการบันทึกข้อมูลหรือไม่?')) {
      axios
        .post(url)
        .then(response => {
          console.log("response: ", response)
          // do something about response
          if(response.data.code){alert("บันทึกข้อมูลไม่สำเร็จ");}
          else if (response.data.rrowsAffected){alert("บันทึกข้อมูลเรียบร้อยแล้วค่ะ ^^!");}
        })
        .catch(err => {
          console.error(err)
        });
      this.FormEditRepair.controls['subposition'].reset()
      this.FormEditRepair.controls['subTools'].reset()
      alert('บันทึกการแก้ไขข้อมูลเรียบร้อย^^');

    }
    else {
      alert('ยกเลิกการบันทึก');
    }
    setTimeout(() => {
      this.Getdatagrouptype();
      this.Getsupgroupdate();
    }, 500);
  }

  // โหลดข้อมูลยี่ห้อรถ
  Carbrand;
  LoadBrandCar() {
    axios
      .get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_car_brand")
      .then(response => {
        let data = response.data.recordsets[0];
        this.Carbrand = data;
        // do something about response
      })
      .catch(err => {
        console.error(err)
      });
  }

  // โหลดเครื่องมือหลัก ย่อย กลุ่มตัด
  Suptools;
  MainToolsH;
  showformH2 = true;
  showformH1 = false;
  dishose = false;
  worker = false;
  MainToolsSelectH() {

    axios
      .get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_tools")
      .then(response => {
        let data = response.data.recordsets[0];
        let suptools = data.filter(el => el.left1 === 'h' && el.right1 == 0);
        this.MainToolsH = suptools;
        // console.log(suptools);
      })
      .catch(err => {
        console.error(err)
      });
  }

  SubToolsSelectH() {

    let subtools = this.FormRepair.get('MainTools').value;
    if (subtools === 'h04') {
      this.showformH2 = false; this.worker = true;
    }
    else if (subtools === 'h05') {
      this.dishose = true; this.showformH2 = true; this.worker = false;
    }
    else {
      this.showformH2 = true; this.showformH1 = false; this.dishose = false; this.worker = false;
    }
    axios
      .get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_tools")
      .then(response => {
        let data = response.data.recordsets[0];
        let suptools = data.filter(el => el.left2 == subtools && el.right1 != 0);
        this.Suptools = suptools;
        console.log(suptools);

      })
      .catch(err => {
        console.error(err)
      });




  }
  // โหลดเครื่องมือหลัก ย่อย

  // โหลดเครื่องมือหลัก ย่อย กลุ่มบำรุง
  SuptoolsM;
  MainToolsM;
  MainToolsSelectM() {
    this.showformH1 = false;
    axios
      .get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_tools")
      .then(response => {
        let data = response.data.recordsets[0];
        let suptools = data.filter(el => el.left1 === 'm' && el.right1 == 0);
        this.MainToolsM = suptools;
      })
      .catch(err => {
        console.error(err)
      });
  }

  SubToolsSelectM() {

    let subtools = this.FormRepair.get('MainTools').value;
    console.log(subtools);
    if (subtools === "m12") { this.showformH = false; }

    axios
      .get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_tools")
      .then(response => {
        let data = response.data.recordsets[0];
        let suptools = data.filter(el => el.left2 == subtools && el.right1 != 0);
        this.Suptools = suptools;
        this.SuptoolsM = suptools;
        console.log(suptools);
      })
      .catch(err => {
        console.error(err)
      });
  }
  // โหลดเครื่องมือหลัก ย่อย กลุ่มบำรุง

  // บันทึกกลุ่มย่อย 
  Savegroupcut() {
    let groupname = this.FormRepair.get('groupname').value;
    // address  
    let canePerDay = this.FormRepair.get('canePerDay').value;
    let Tools = this.FormRepair.get('Tools').value;
    let position = this.FormRepair.get('position').value;
    let tel = this.FormRepair.get('tel').value;
    let zip = this.FormRepair.get('zip').value;
    let provinces = this.FormRepair.get('provinces').value;
    let county = this.FormRepair.get('subdistrict').value;
    let district = this.FormRepair.get('district').value;
    let NAMEMOO = this.FormRepair.get('NAMEMOO').value;
    let MOO = this.FormRepair.get('MOO').value;
    let HOMENO = this.FormRepair.get('HOMENO').value;
    let fmname = this.FormRepair.get('fmname').value;
    let fmcode = this.FormRepair.get('fmcode').value;

    let comment = this.FormRepair.get('comment').value;
    let brand = this.FormRepair.get('brand').value;
    let horsepower = this.FormRepair.get('horsepower').value;
    let Model_brand = this.FormRepair.get('Model_brand').value;
    let product_year = this.FormRepair.get('product_year').value;
    let possess_year = this.FormRepair.get('possess_year').value;
    let worker = this.FormRepair.get('humancanperday').value;
    let carboardnumber = this.FormRepair.get('carboardnumber').value;
    if (groupname === '' || groupname == null ||
      position === '' || canePerDay === '' || Tools === '' || MOO === '' || fmcode === '' || fmname === '' || zip === '' || provinces === '' || county === '' || district === '' || NAMEMOO === ''
      || position == null || canePerDay == null || Tools == null || MOO == null || fmcode == null || fmname == null || zip == null || provinces == null || county == null || district == null || NAMEMOO == null) { alert('กรุณากรอกข้อมูลให้ครบทุกช่อง'); }
    // 
    else {
      console.log(canePerDay);
      product_year = product_year - 543;
      possess_year = possess_year - 543;

      if (confirm('ต้องการบันทึกข้อมูลหรือไม่?')) {
        var url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/insertGroupCode_n0?"
          + "year='2122'"
          // เลือกเอา
          + "&category='" + groupname.slice(0, 1) + "'" // ประเภทกลุ่ม
          // +"&qtype='"+ grouptype2 + "'" // ประเภทกลุ่มกรณีกลุ่ม H 


          + "&groupcode='" + groupname.slice(1, 7) + "'" // รหัสนักส่งเสริม
          //  กรอกเพิ่มเอง   
          + "&canePerDay=" + canePerDay + "" // ความสามารถต่อวัน
          + "&Tools='" + Tools + "'" // เครื่องมืออุปกรณ์
          + "&position='" + position + "'" // ตำแหน่ง
          + "&tel='" + tel + "'" // หมายเลขติดต่อ
          + "&zip='" + zip + "'"  // รหัสไปรณีษ์
          + "&province='" + provinces + "'" //จังหวัด
          + "&county='" + county + "'" // ตำบล
          + "&district='" + district + "'" // อำเภแ
          + "&NAMEMOO='" + NAMEMOO + "'" // ชื่อหมู่บ้าน
          + "&MOO='" + MOO + "'" // หมายเลขหมู่บ้าน
          + "&HOMENO='" + HOMENO + "'" // บ้านเลขที่
          + "&fmname='" + fmname + "'" //ชื่อชาวไร่
          + "&fmcode='" + fmcode + "'" // รหัสชาวไร่
          + "&comment='" + comment + "'"
          + "&brand='" + brand + "'"
          + "&horsepower=" + horsepower
          + "&Model_brand='" + Model_brand + "'"
          + "&product_year='" + product_year + "'"
          + "&possess_year='" + possess_year + "'"
          + "&worker=" + worker + ""
          + "&reg_num='" + carboardnumber + "'"
          + "&UpdateBY='" + this.supcode + "'"
          // หัวหน้ากลุ่ม
          ;
        axios.post(url).then(response => {
        if(response.data.code){alert("บันทึกข้อมูลไม่สำเร็จ")}
          else if (response.data.rrowsAffected){alert("บันทึกข้อมูลเรียบร้อยแล้วค่ะ ^^!")}
        }).catch(err => {console.log(err);})
        $('input[type="text"]').val('');
        $("#datazone").prop('selectedIndex', -1)
        $("#grouptype").prop('selectedIndex', -1)
        $("#farmernamese").prop('selectedIndex', -1)

        setTimeout(() => {
          this.Getdatagrouptype();
          this.Getsupgroupdate();
        }, 500);
        // this.GetComment();
      }
      else {
        console.log('no update');
      }
    }

  }
  // บันทึกกลุ่มย่อย 
  // คำนวณคนทำงานต่อวัน

  allcandoperday: number;
  Humancanperday() {
    let perday = this.FormRepair.get('humancanperday').value;
    let humancanperday = 1.5;
    this.allcandoperday = humancanperday * perday;
    // console.log(this.allcandoperday);
  }
  // คำนวณคนทำงานต่อวัน
  // เงื่อนไขพิเศษ

  // ยกเลิกกลุ่ม ลบนั่นล่ะ  
  RemoveMaingroup(iddata) {
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/canceled_groupcode?iddata=" + iddata;
    if (confirm('ต้องการลบข้อมูลหรือไม่?')) {
      axios
        .get(url)
        .then(function (response) {
          console.log(response);
          alert('ลบรายการเรียบร้อยแล้วค่ะ');
        });
    }
    else {
      console.log('ยกเลิกการลบแล้วค่ะ');
    }
    this.Getdatagrouptype();
    this.Getsupgroupdate();
  }

  Removesubgroup(iddata) {
    let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/canceled_groupcode_n0?iddata=" + iddata;
    if (confirm('ต้องการลบข้อมูลหรือไม่?')) {
      axios
        .get(url)
        .then(function (response) {
          console.log(response);
          alert('ลบรายการเรียบร้อยแล้วค่ะ');
        });
    }
    else {
      console.log('ยกเลิกการลบแล้วค่ะ');
    }
    this.Getdatagrouptype();
    this.Getsupgroupdate();
  }

  
  AllMaindataGroupboard:any;
  MaindataGroupboard
  Canperday;
  GetGroupBoard() {
    axios
      .get('https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode_put2')
      .then(res => {
        // console.log(res.data.recordsets);
        this.AllMaindataGroupboard = res.data.recordsets[0];
        this.MaindataGroupboard = res.data.recordsets[0].filter(el => el.supzone === "Z" && el.supcode === "Z");
        let allpart = this.AllMaindataGroupboard.filter(el => el.supzone === "Z" && el.supcode === "Z");
        let Partcode = allpart.map(function (elem){return elem.Partcode});
      })
      .catch(error => {
        console.log(error);
      });
  }
  // ZoneMaindataGroupboard;
  ZoneMaindataGroupboard:any []=[];

  GetSubGroupBoard(Partcode){
    this.ZoneMaindataGroupboard =[];
    let bypartcodetozone = this.AllMaindataGroupboard.filter(el => el.Partcode == Partcode && el.supcode === "S" && el.supzone !== "Z");
    let data = bypartcodetozone.map(function(element){return element.supzone.trim(); });
    let setdata = Array.from(new Set(data));
   for (let index = 0; index < setdata.length; index++) {
     const element = this.AllMaindataGroupboard.filter(el => el.supzone.trim() === setdata[index] && el.supcode.trim()  === 'S');
     this.ZoneMaindataGroupboard.push(element[0]);
   }
  }
  supportterboard:any []=[];

  GetSupportGroupboard(Partcode,supzone){
    
    this.supportterboard =[];
    let bypartsupcodetozone = this.AllMaindataGroupboard.filter(el => el.Partcode == Partcode && el.supcode !== "S" && el.supzone === supzone );
    let data = bypartsupcodetozone.map(function(element){return element.supcode.trim(); });
    // console.log(data);
    let setdata = Array.from(new Set(data));
    for (let index = 0; index < setdata.length; index++) {
      const element = this.AllMaindataGroupboard.filter(el =>  el.supcode.trim()  === setdata[index] );
      // console.log(element[0]);
      this.supportterboard.push(element[0]);
    }
  }
  // ข้อมูลภาพรวม การทำงานต่อวัน
  m120; // รถไถ
  h010;// รถตัด
  h020;// รถบรรทุก
  h030;// รถคีบ
  m070; //เครื่องปลูก
  m090; // เครื่องฝังปุ๋ย
  GetCanperday() {

    axios.get('https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_tools_sum?cases=1')
      .then(res => {
        this.Canperday = res.data.recordsets[0];
        this.m120 = this.Canperday.filter(el => el.tools_id === "m120")
        this.m070 = this.Canperday.filter(el => el.tools_id === "m070")
        this.m090 = this.Canperday.filter(el => el.tools_id === "m090")
        this.h010 = this.Canperday.filter(el => el.tools_id === "h010")
        this.h020 = this.Canperday.filter(el => el.tools_id === "h020")
        this.h030 = this.Canperday.filter(el => el.tools_id === "h030")
        // console.log(this.m090);
      })
      .catch(error => { console.log(error) })
  }

  // ข้อมูลกลุ่มตัดกลุ่มบำรุงทั้งหมด
  sumhgroup;
  summgroup;
  GetAllGroup() {
    axios
      .get('https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode')
      .then(res => {
        let hgroup = res.data.recordsets[0].filter(el => el.category === "H")
        let mgroup = res.data.recordsets[0].filter(el => el.category === "M")
        this.sumhgroup = hgroup.length;
        this.summgroup = mgroup.length;

      })
      .catch(err => { console.log(err) })
  }
  datachart;
  lebelchart;
  pluginsChart;
  typeChart: any;
  dataChart: any;
  dataChart2: any;
  optionsChart: any;
  optionsChart2: any;
  
  Loadchart(){
    this.datachart='';
    this.lebelchart='';
    this.typeChart = 'bar';  
    axios
    .get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode_put")
    .then(res => {
      let data = res.data.recordsets[0].filter(el => el.supzone.trim() !=='Z');
      let supzone = data.map(function (elem){return elem.supzone.trim()});
      let gc_all = data.map(function (elem){return elem.gc_all});
      let gc_ke = data.map(function (elem){return elem.gc_ke});
      let pc_gc_ke = data.map(function (elem){return elem.pc_gc_ke});
      // 
      ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
      this.dataChart = {
       
        labels: supzone,
        datasets: [
      
          {
            label:"แปลงอ้อยทั้งหมดแบ่งตามโซน" ,
            data:gc_all,
            yAxisID: "id1",
            backgroundColor: "#1abc9c", borderWidth: 1,
            datalabels:{
              color:'black',
              acchor:'end',
              align:'top',
              offset:10 
            },
          },
          {
            label:"แปลงอ้อยที่คีย์กลุ่มตัดแล้ว" ,
            data: gc_ke,
            yAxisID: "id1",
            backgroundColor: "#3498db", borderWidth: 1,
            datalabels:{
              color:'black',
              acchor:'end',
              align:'top',
              offset:10
            },
        },
        {
          type:'line',
          label: '% แปลงอ้อยที่คีย์กลุ่มตัดแล้ว',
          data: pc_gc_ke, 
          backgroundColor: "#F39237", borderWidth: 1,
          yAxisID: "id2",
         
        }
        ],
      };

      this.optionsChart = {
        responsive: true,
        plugin: [ChartDataLabels],
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end'
          }
        },
     
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'กราฟแสดงแปลงอ้อยแบ่งตามงวด',
          fontSize: 18
        },
        scales: {

            xAxes: [{
                ticks: {
                    fontSize: 14
                },
            }],
            yAxes: [{
                
              display: true,
              position: 'left',
               scaleLabel: {
                   display: true,
                   beginAtZero: true,
               },
               ticks: {
                fontSize: 14,
                beginAtZero: true,
                min: Math.min(0),
                max: Math.max(3500),
                },
              //yAxisID: "id1"
              id: "id1" // incorrect property name.
           },{
            ticks: {
              fontSize: 14,
              beginAtZero: true,
              min: Math.min(0),
              max: Math.max(100),
              },

              scaleLabel: {
                   display: true,
                  //  labelString: 'Commissions',
                   beginAtZero: true,

               },
              //display: false,
              display: true, // Hopefully don't have to explain this one.
              position:"right",
              gridLines: {
                  display: false
              },
              //yAxisID: "id2"
              id: "id2" // incorrect property name.
           }
               
            ],
           
        }
      };
    
    })
    .catch ( error => { console.log(error)});
    
    axios.get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_period_cut_6465_group").then(
      res => {
        let data = res.data.recordsets[0].filter(el => el.period_cut != 0);
        let period_name = data.map(function (elem){return elem.period_name});
        let Assess = data.map(function (elem){return elem.Assess});
        let cnt = data.map(function (elem){return elem.cnt});

       
        this.dataChart2 = {
       
        labels: period_name,
        datasets: [

          {
            label:"ประเมินอ้อย แบ่งตามงวด" ,
            data: Assess,
            // backgroundColor: ['#1abc9c', '#1abc9c','#1abc9c' ,'#3498db','#3498db','#3498db','#3498db', '#9b59b6', '#9b59b6', '#bdc3c7', '#bdc3c7', '#bdc3c7', '#f39c12', '#f39c12', '#f39c12','#000000','#000000','#000000']
            backgroundColor: "#9b59b6",
            datalabels:{
              color:'black',
              acchor:'end',
              align:'top',
              offset:10
            }
        },
        // {
        //   label:"จำนวนแปลงอ้อย" ,
        //   data:cnt,
        //   backgroundColor: "#f39c12",
        //   datalabels:{
        //     color:'black',
        //     acchor:'end',
        //     align:'top',
        //     offset:10
        //   }
        // },
        ],
      };
      
      this.optionsChart2 = {
        responsive: true,
        plugin: [ChartDataLabels],
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end'
          }
        },
     
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'กราฟแสดงแปลงอ้อยแบ่งตามงวด',
          fontSize: 18
        },
        scales: {

            xAxes: [{
                ticks: {
                    fontSize: 14
                }
            }],
            yAxes: [{
                ticks: {
                    fontSize: 14,
                    beginAtZero: true,
                    min: Math.min(0),
                    max: Math.max(1000),
            },
               
            }],
           
        }
      };
    })
    .catch ( error => { console.log(error)});
    
  }

  Alldatabyqueue;
  cutqueue;
  lockqueue;
  castqueue;
  sucarcanesquare;
  Loadgroupcutqueue(){
    axios.get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_sumAssess_qtype")
    .then(res => {
      let data = res.data.recordset;
      this.Alldatabyqueue = data;
      this.castqueue = this.Alldatabyqueue.filter(el => el.qtype == 2);
      this.cutqueue = this.Alldatabyqueue.filter(el => el.qtype == 3);
      this.lockqueue = this.Alldatabyqueue.filter(el => el.qtype == 1);
      this.sucarcanesquare = this.Alldatabyqueue.filter(el => el.qtype == 4);
    }).catch(err => { console.log(err);}) 

  
  }

  allsupporttergroupdata;
  photosupportter;
  Loadsupporttergroupdata(scode){
    this.spinner.show();
    axios
    .get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_groupCode_HM_assess")
    .then(res => {
      let data = res.data.recordset;
      // console.log(scode)
      this.allsupporttergroupdata = data.filter(el => el.supcode == scode.trim());
      // console.log(this.allsupporttergroupdata);
      this.spinner.hide();
    })
    .catch(err => {console.log(err);})

    axios.get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/dbcps/get_users_all")
    .then(res => {
      let data = res.data.recordset;
      let onedata = data.filter(el => el.supcode == scode.trim());
      this.photosupportter = onedata[0].suppic_url;
    })
    .catch(err=> {console.log(err);})
  }

  // แสดงกลุ่มตัดกลุ่มบำรุงโดยนักส่งเสริม
  showHcode = false;
  showMcode = false;
  Showgroupcutbysup(check){
    if (check == 1){ this.showHcode = false; this.showMcode = true;}
    if (check == 2){ this.showHcode = true; this.showMcode = false;}
  }
}
