import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() zone;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.Loadtopbar();
    console.log(this.zone);
  }

  ClickMain() {
    document.getElementById("allsupportter").style.display = "block";
    document.getElementById("supportter").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
  }
  ClickSupportter() {
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("supportter").style.display = "block";
    document.getElementById("singeldata").style.display = "none";
  }
  ClickSupportdata() {
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("supportter").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("singeldata").style.display = "block";
  }
  ClickReport() {
    document.getElementById("allsupportter").style.display = "none";
    document.getElementById("supportter").style.display = "none";
    document.getElementById("singeldata").style.display = "none";
    // document.getElementById("report").style.display = "block";
  }

  Logout() {

    localStorage.removeItem('userdata');
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  topbardata;
  zonedata;
  Loadtopbar(){
    axios.get("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_Assess")
    .then(res => {
      let data = res.data.recordsets[0];
    
    this.topbardata = data.filter(el => el.supzone === "BRD");;
    this.zonedata = data.filter(el => el.supzone == this.zone);
    })
    .catch( error => {console.log(error)});
    
  }
}
