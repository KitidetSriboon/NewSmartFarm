import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-prbrd',
  templateUrl: './prbrd.component.html',
  styleUrls: ['./prbrd.component.css']
})
export class PrbrdComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  @ViewChild(MatSort) sort: MatSort;
    // อบรม
    FormCheckandTrain: FormGroup;
    savelist = false;
    showlist = true;
    showall = true;
    Editresult;
    title;
    trainall;
    farmmerdatalist;
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
    ckeckre = [
    //  {value :'', name :'-- --'},
       {value :'3', name :'ระหว่างตรวจสอบ'},
       {value :'1', name :'ผ่าน'},
       {value :'2', name :'ไม่ผ่าน'},
    ]
    DataTrainallList;
    TrainallList;
    trainallListColumns: string[] = ['date_training_th', 'fmcode',  'fmname', 'title_docs', 'supzone', 'results_desc','comment','date_add_th' ,'editdata','cancelddata'];
    //
  
  constructor() {
    this.FormCheckandTrain = new FormGroup({
      farmname : new FormControl(),
      selectdoc : new FormControl(),
      title_doc : new FormControl(),
      title_dec : new FormControl(),

      title_date : new FormControl(),
      title_zone : new FormControl(),
      title_check : new FormControl(),
      title_fmname : new FormControl(),
      title_comment : new FormControl(),

    })
   
    this.LoadtitileTrack();
    this.LoadTraindata();
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.LoadtitileTrack();
    this.LoadTraindata();
    }, 5000);
    
  }

  ngAfterViewInit() {
   
   
    this.TrainallList.paginator = this.paginator;
    this.TrainallList.sort = this.sort;
    
  }

  // สลับแสดงผล จาก select
  Changedoc(){
    let selectdoc = this.FormCheckandTrain.get('selectdoc').value;
    // console.log(selectdoc);
    if (selectdoc==1){ this.savelist = false; this.showlist=true; this.showall = true;}
    else if (selectdoc==2){ this.savelist = true; this.showlist=false; this.showall = true;}
    else {this.savelist = true; this.showlist=true; this.showall = false; this.LoadTraindata();}
  }

  // ฟิลเตอร์ข้อมูลการอบรม

  Filterby(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.TrainallList.filter = filterValue.trim().toLowerCase();;
    if (this.TrainallList.paginator) {
      this.TrainallList.paginator.firstPage();
    }
  }
  // โหลดข้อมูลชาวไร่
  getfarmmerdata(){
    let text = this.FormCheckandTrain.get('farmname').value;
    let fmdata = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/farmer_basicByfmcode?text_fm='+text+'';
    
    fetch(fmdata)
      .then(res => res.json())
      .then((out : any) => {
        const data = out.recordsets[0]; 
          // alert(a); 
        // console.log('DATA From SQL:.=>', data);     
        this.farmmerdatalist = data;
        console.log('DATA From SQL:.=>',this.farmmerdatalist )
        return this.farmmerdatalist;
      })
      .catch(err => { throw err });
  
  }

  // โหลดข้อมูล หัวข้อ 
  LoadtitileTrack(){
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/selectPR_TitleTrack';
    fetch(url)
      .then(res => res.json())
      .then((out: any) => {
        this.title = out.recordsets[0];
      })
    .catch(err => { throw err });
  }

  LoadTraindata(){
    let url2 = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/selectPR_dataTitleTrack';
    axios
    .get(url2)
    .then(response => {
      let data =  response.data.recordsets[0];
      this.TrainallList = new MatTableDataSource(data);
    })
    .catch(err => {
      console.error(err)
    })
  }
  // บันทึกข้อมูลหัวข้อ
  SaveCheckandTrainGroup(){
    let title_doc = this.FormCheckandTrain.get('title_doc').value;
    let title_dec = this.FormCheckandTrain.get('title_dec').value;

    if (title_doc == null || title_dec == null || title_doc =='' || title_dec == '' ){alert('กรุณากรอกข้อมูลให้ครบทุกช่อง^^');}
    else {
      if (confirm('ต้องการบันทึกข้อมูลหรือไม่?')) {
      let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/insertPR_TitleTrack?title_docs='" + title_doc  + "'"
      +"&title_Description='"+ title_dec +"'";
     
      axios.post(url).then(res => {
        if(res.data.code){alert("บันทึกข้อมูลไม่สำเร็จ");}
        if(res.data.rowsAffected){alert("บันทึกข้อมูลเรียบร้อย");}
      }).catch(err => {console.log(err)})

      this.LoadtitileTrack();
        $('input[type="text"]').val('');
        $('textarea').val('');
      }
      else {
        console.log('no update');
      }
    }
  }
  // บันทึกข้อมูลผลอบรม
  SaveTrainresults(){
    let title_doc = this.FormCheckandTrain.get('title_doc').value;
    let title_date = this.FormCheckandTrain.get('title_date').value;
  
    let title_check = this.FormCheckandTrain.get('title_check').value;
    let title_fmname = this.FormCheckandTrain.get('title_fmname').value;
    let title_comment = this.FormCheckandTrain.get('title_comment').value;
    console.log(title_fmname);
    if (title_doc == null || title_date == null || title_check == ''){alert('กรุณากรอกข้อมูลให้ครบทุกช่อง^^');}
    else {
      if (title_comment == null){
        title_comment = '';
      }
      let url = "https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/insertPR_dataTitleTrack?title_id=" + title_doc +
      "&fmcode='"+ title_fmname[0] +"'"+
      "&supzone='"+ title_fmname[2] +"'"+
      "&results='"+ title_check +"'"+
      "&comment='"+ title_comment +"'"+
      "&date_training='"+ title_date +"'";
      axios.post(url).then(res => {
        if(res.data.code){alert("บันทึกข้อมูลไม่สำเร็จ");}
        if(res.data.rowsAffected){alert("บันทึกข้อมูลเรียบร้อย");}
      }).catch(err => {console.log(err)})

        
      
       
        this.LoadTraindata();  
        
     
        this.FormCheckandTrain.controls['title_check'].reset();
        this.FormCheckandTrain.controls['title_fmname'].reset();
        this.FormCheckandTrain.get('title_comment').setValue('');
        this.FormCheckandTrain.controls['farmname'].reset();
      }
     
  }
  // ยกเลิกรายการ
  CancleTrain(id){
    if (confirm('ต้องการยกเลิกรายการหรือไม่?')) {
    let url ="https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/canceled_dataTitleTrack?pr_id=" + id;
      
      axios.post(url).then(res =>{ 
        if(res.data.rowsAffected){ alert('ยกเลิกรายการเรียบร้อย ^_^!');}
    
      if (res.data.code) {alert("ยกเลิกรายการไม่สำเร็จ");}
    }).catch(err=>{console.log(err);})
      this.LoadTraindata();
    }
    else {
      console.log('no update');
    }

  }

  // แก้ไขผลประเมิน
  Editdatatrain(pr_id,oldresults){
    let loadstatus = this.FormCheckandTrain.get('title_check').value;
    let status = '';
    if (loadstatus == null || loadstatus == ''){
      status = oldresults ;
    }
    else {
      status = loadstatus;
      axios
      .post("https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/update_results_dataTitleTrack?pr_id="+ pr_id +"&results=" + status)
      .then(res => {
        console.log("response: ", res)
        if(res.data.rowsAffected){ alert('แก้ไขรายการเรียบร้อย ^_^!');}
    
        if (res.data.code) {alert("บันทึกรายการไม่สำเร็จ");}
      })
      .catch(err => {
        console.error(err)
      })
     
      this.LoadTraindata();
      this.FormCheckandTrain.controls['title_check'].reset()
      this.FormCheckandTrain.get('title_check').setValue(0);   
    }
  }
}
