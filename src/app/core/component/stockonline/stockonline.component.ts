import { Component, OnInit , ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stockonline',
  templateUrl: './stockonline.component.html',
  styleUrls: ['./stockonline.component.css']
})
export class StockonlineComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  @ViewChild(MatSort) sort: MatSort;
 

  constructor() { }
 

  // Stock Online
  FormStock: FormGroup;
  dataSource2;

  ngOnInit(): void {
    this.FormStock = new FormGroup({
      namestock : new FormControl(),

    })
    this.loadstockdata();
    
   
  }

  ngAfterViewInit() {
   
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
   
    
  }

  applyFilter2(event: Event) {
    const filterValue2 = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue2.trim().toLowerCase();;
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }



  // โหลดข้อมูล Stock
  loadstockdata(){
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/stockOnline' ;
    axios// console.log(namestock);
    .get(url)
      .then((res: any) => {
        const data = res.data.recordsets[0];
        this.dataSource2 =  new MatTableDataSource(data);
      })
    .catch(err => { throw err });
  }

   
  displayedColumns2: string[] = ['whsName', 'whscode',  'onhand'];


}
