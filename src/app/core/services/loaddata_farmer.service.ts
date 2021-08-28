import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
    providedIn: "root",
})

export class LoaddataFarmmerService{
    fammerdata;
    Loadfarmerdata(text){
        let fmdata = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/fmsearch?fmname='+text+'';
        axios.get(fmdata)
        .then(res => {
            let  data = res.data.recordset;
            this.fammerdata = data;
        }).catch(err => {console.log(err);})
        return this.fammerdata;
    }
    
    subgroupdata:any[];
    Loadsubgroup(){
        
        axios
        .get('https://asia-southeast2-brr-farmluck.cloudfunctions.net/brdsqlapi/select_v_groupCode_HMn0_1')
        .then(res => {
            let  data = res.data.recordset;
            this.subgroupdata = data;
            // console.log(this.subgroupdata);
        }).catch(err => 
            {console.log(err);})
        return this.subgroupdata;
    }
}