import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-plantaction',
  templateUrl: './plantaction.component.html',
  styleUrls: ['./plantaction.component.css']
})
export class PlantactionComponent implements OnInit {

  // ตัวแปรรับค่าแปลง
  Allplantdata : any = {};
  constructor(private firebaseService : FirebaseService) { }

  ngOnInit(): void {
    // this.firebaseService.getMaster();
    this.Loaddataplant();
  }

  Loaddataplant(){
    this.firebaseService.getplantdata()
    .then((dataincome: any) =>{
      // console.log(dataincome);
      this.Allplantdata = dataincome;
     
    });
  }
}
