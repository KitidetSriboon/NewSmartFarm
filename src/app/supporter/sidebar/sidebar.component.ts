import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mode = new FormControl('over');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  isExpanded = true;
  constructor(private spinner: NgxSpinnerService) { }
  @Input() username: any;  
  @Input() userphoto: any;
  @Input() supcode: any;
  @Input() userlevel: any;
  // username:any;
  photourl;
  name;
  takesupcode;
  orther = true;
  manager = true;
  headmanager = true;
  pr = true;

  ngOnInit(): void {
    this.name = this.username;
    this.photourl = this.userphoto;
    this.takesupcode = this.supcode;
    if (this.userlevel == 8||this.userlevel == 4){ this.pr = false;}
    if (this.userlevel === '6' || this.userlevel === '7' || this.userlevel === '8' || this.userlevel === '10' || this.userlevel === '99')
    {
      this.orther = false;
    }
    if ( this.userlevel === '13'|| this.userlevel === '14'|| this.userlevel === '15')
    {
      this.manager = false;
      this.orther = false;
    }
    if(this.userlevel === '11' || this.userlevel === '12' || this.userlevel === '15')
    {
      this.manager = false;
      this.orther = false;
      this.headmanager = false;
    }
  }
 
  mainclick = false;
  KPI = false;
  sugarcanedata = false;
  supportdata = false;
  onlinecredit = false;
  seasoncane = false;
  onlinereport = false;
  formreport = false;
  tabledata = false;
  action6465 = false;
  accept = false;
  clicked(x) {

    if (x === 1) {
      this.KPI = !this.KPI;
    }
    if (x === 2) {
      this.sugarcanedata = !this.sugarcanedata;
    }
    if (x === 3) {
      this.supportdata = !this.supportdata;
    }
    if (x === 4) {
      this.onlinecredit = !this.onlinecredit;
    }
    if (x === 5) {
      this.seasoncane = !this.seasoncane;
    }
    if (x === 6) {
      this.onlinereport = !this.onlinereport;
    }
    if (x === 7) {
      this.formreport = !this.formreport;
    }
    if (x === 29) {
      this.action6465 = !this.action6465;
    }
    if (x === 100) {
      this.accept = !this.accept;
    }
    else {
      this.tabledata = !this.tabledata;
    }



  } 
  findfarmmerdata(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="block";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
  }
  findlandata() {
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "block";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  main() {
    this.mainclick = !this.mainclick;
    document.getElementById("main").style.display = "block";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
  }
   

  myprofile(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="block"
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
  
  }
    

  showkpi() {
    this.KPI = !this.KPI;
    this.spinner.show();

    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("singeldata").style.display = "block";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   


    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showkpisupportter() {
    this.KPI = !this.KPI;
    this.spinner.show();
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "block";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   


    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showkpiheadzone() {
    this.KPI = !this.KPI;
    this.spinner.show();

    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "block";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none"
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   


    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showkpimanager() {
    this.KPI = !this.KPI;
    this.spinner.show();

    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "block";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   


    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showaction6465() {
    this.spinner.show();
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "block";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   


    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showgrowup() {
    this.spinner.show();
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "block";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   


    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

 

  showtarget6465() {
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none"
    document.getElementById("mytarget").style.display = "none"
    document.getElementById("target").style.display = "block"
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showgrade6465() {
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "block";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showfertilizer3() {
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "block";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  shownote6465() {
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "block";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   

    // inside note 
    document.getElementById("mapdata").style.display = "block";
    document.getElementById("formdata").style.display = "block";
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showbugandgerm() {
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "block";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showactioncomment(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="block";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
  }


  showrepairgroup(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="block";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
   
  }

  stockonline(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="block";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
  }

  showcheckandtrain(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "block";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
  } 

  showmaingroupcut(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="block";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
  }

  showcontact(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "block";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "none";
  }

  showmorearea6566(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "block";
    document.getElementById("docforgroupcut").style.display = "none";
  }

  showdocforgroupcut6566(){
    document.getElementById("main").style.display = "none";
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
    document.getElementById("action6465").style.display = "none";
    document.getElementById("findlanddata").style.display = "none";
    document.getElementById("mytarget").style.display = "none";
    document.getElementById("target").style.display = "none";
    document.getElementById("fertilizer3").style.display = "none";
    document.getElementById("note6465").style.display = "none";
    document.getElementById("bugandgerm").style.display = "none";
    document.getElementById("myprofile").style.display ="none";
    document.getElementById("farmmerdata").style.display ="none";
    document.getElementById("formactioncomment").style.display ="none";
    document.getElementById("repairgroup").style.display ="none";
    document.getElementById("stockonline").style.display ="none";
    document.getElementById("checkandtrain").style.display = "none";
    document.getElementById("maingroupcut").style.display ="none";
    document.getElementById("credit").style.display = "none";
    document.getElementById("managearea").style.display = "none";
    document.getElementById("docforgroupcut").style.display = "block";
  }
}
