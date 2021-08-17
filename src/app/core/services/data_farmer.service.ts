import axios from "axios";


export class FarmmerService{
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
}