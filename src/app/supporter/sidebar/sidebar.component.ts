import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mode = new FormControl('over');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  isExpanded = true;
  constructor(private spinner: NgxSpinnerService,private router: Router) { }
  // username:any;
  photourl;
  name;
  takesupcode;
  orther = true;
  manager = true;
  headmanager = true;
  pr = true;
  decryptedInfo;
  actionlevel;
  ngOnInit(): void {
    let data = localStorage.getItem('userdata');
    var deData = CryptoJS.AES.decrypt(decodeURIComponent(data), 'bsfdev');
    this.decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));

    this.name = this.decryptedInfo.alldata[0].supname;
    this.photourl = this.decryptedInfo.alldata[0].suppic_url;
    this.takesupcode = this.decryptedInfo.alldata[0].supcode;
    this.actionlevel = this.decryptedInfo.alldata[0].userlevel;
    if (this.actionlevel == 8||this.actionlevel == 4){ this.pr = false;}
    if (this.actionlevel === '6' || this.actionlevel === '7' || this.actionlevel === '8' || this.actionlevel === '10' || this.actionlevel === '99')
    {
      this.orther = false;
    }
    if ( this.actionlevel === '13'|| this.actionlevel === '14'|| this.actionlevel === '15')
    {
      this.manager = false;
      this.orther = false;
    }
    if(this.actionlevel === '11' || this.actionlevel === '12' || this.actionlevel === '15')
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
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
    document.getElementById("report").style.display = "none";
  
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
   
  }
  findlandata() {
    document.getElementById("main").style.display = "none";
   
    document.getElementById("report").style.display = "none";
  
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
   
   
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  main() {
    // this.mainclick = !this.mainclick;
    this.router.navigateByUrl("/supporter");
   
   
  }
   

  myprofile(){
    this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
  
    document.getElementById("report").style.display = "none";
    
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
    
   
  
  }
    

  showkpi() {
    this.KPI = !this.KPI;

    this.router.navigateByUrl("/kpiall");
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("singeldata").style.display = "block";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
  
   


    
  }

  showkpisupportter() {
    this.KPI = !this.KPI;
     this.router.navigateByUrl("/kpiall");

    document.getElementById("allsupportter").style.display = "block";
    
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "none";
  
  }

  showkpiheadzone() {
    this.KPI = !this.KPI;
 

     this.router.navigateByUrl("/kpiall");
  
    document.getElementById("allsupportter").style.display = "none";

    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "block";
    document.getElementById("kpimanager").style.display = "none";
    
   


  }

  showkpimanager() {
    this.KPI = !this.KPI;
    this.router.navigateByUrl("/kpiall");
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    document.getElementById("kpiheadzone").style.display = "none";
    document.getElementById("kpimanager").style.display = "block";
   
   
  }

  showaction6465() {
   
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
    document.getElementById("report").style.display = "none";
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

  }

  showgrowup() {
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
   
    document.getElementById("report").style.display = "none";
   
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
    
   


   
  }

 

  showtarget6465() {
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
  
    document.getElementById("report").style.display = "none";
  
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
   
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showgrade6465() {
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
  
    document.getElementById("report").style.display = "none";
  
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
   
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showfertilizer3() {
    this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
   
    document.getElementById("report").style.display = "none";
    
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
  
   
   
  }

  shownote6465() {
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
    
    document.getElementById("report").style.display = "none";
    
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
   

    // inside note 
    document.getElementById("mapdata").style.display = "block";
    document.getElementById("formdata").style.display = "block";
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showbugandgerm() {
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
  
    document.getElementById("report").style.display = "none";
   
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
   
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showactioncomment(){
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
   
    document.getElementById("report").style.display = "none";
   
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
   
  }


  showrepairgroup(){
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
 
    document.getElementById("report").style.display = "none";
    
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
   
  }

  stockonline(){
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
   
    document.getElementById("report").style.display = "none";
    
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
   
  }

  showcheckandtrain(){
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
   
    document.getElementById("report").style.display = "none";
    
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
   
  } 

  showmaingroupcut(){
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
   
    document.getElementById("report").style.display = "none";
    
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
   
  }

  showcontact(){
     this.router.navigateByUrl("/supporter");
    document.getElementById("main").style.display = "none";
   
    document.getElementById("report").style.display = "none";
    
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
   
  }

  showmorearea6566(){
     this.router.navigateByUrl("/managearea");
  }

  showdocforgroupcut6566(){
    this.router.navigateByUrl("/docforgroupcut");

    document.getElementById("docforgroupcut").style.display = "block";
  }

  shownewplantcane(){
    this.router.navigateByUrl("/newplantcane");
  }
}
