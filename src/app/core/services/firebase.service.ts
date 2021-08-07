import { Injectable, Output } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  data :any
  constructor(private firebase: AngularFireDatabase) { }

  getplantdata(){
    return new Promise((res, rej) => {
      this.firebase
      .list("inst1/tx/2122/areas")
      // 
        .query.limitToFirst(10)
        .orderByChild("DetailPlant/ZoneId").equalTo('01.1')
        .once('value')
        .then((snapshots) => {
          let plantdata:any[] = [];
          snapshots.forEach((snapshot) => {
            let rec =  { 
             key: snapshot.key,
              ...snapshot.val(), 
            }
            plantdata.push(rec)
          });
          res(plantdata);
          // console.log(snapshots.val());
        }).catch((e) => {
          rej(e);
        });
        
    });
  }

  updateplantdata(){
    return new Promise((res, rej) => {
      this.firebase
        .list("inst1/tx/2122/areas")
        .query
        .orderByChild("DetailPlant/ZoneId")
        // .equalTo()
        .once("value")
        .then((snapshots) => {
          let plantdata: any = []
          snapshots.forEach((snapshots => {
            let rec = {
              key: snapshots.key,
              ...snapshots.val()
            }
            // if () 
            // {
            //   plantdata.push(rec)
            // }
            
          }))
          res(plantdata)
        }).catch((e) => {
          rej(e)
        })
    })
  }

  getRef() {
    return this.firebase;
  }

  getMaster() {
    return new Promise((resolve, reject) => {
      this.firebase
      .list("inst1/tx/2122/areas")
      // 
        .query.limitToFirst(10)
        .orderByChild("DetailPlant/ZoneId").equalTo('01.1')
        .once('value')
        .then((snapshots) => {
         
         
          console.log(snapshots.val());
        })
        .catch((e) => reject(e));
    });
  }

  getMapByYear(year: any) {
    return new Promise((res, rej) => {
      this.firebase
        .list("inst1/tx/" + year + "/areas")
        .query.limitToFirst(10)
        .once("value")
        .then((snapshots) => {
          let maps: any[] = [];
          snapshots.forEach((snapshot) => {
            maps.push({
              key: snapshot.key,
              ...snapshot.val(),
            });
          });
          // console.log(maps);
          res(maps);
        })
        .catch((e) => {
          rej(e);
        });
    });
  }

  getMapByLandno(year: any, landno: any) {
    return new Promise((res, rej) => {
      this.firebase
        .list("inst1/tx/" + year + "/areas")
        .query.orderByChild("landno")
        .equalTo(landno)
        .once("value")
        .then((snapshots) => {
          let maps;
          snapshots.forEach((snapshot) => {
            maps = {
              key: snapshot.key,
              ...snapshot.val(),
            };
          });
          res(maps);
        })
        .catch((e) => {
          rej(e);
        });
    });
  }

  getMapByBNMCode(year: any, code: any) {
    return new Promise((res, rej) => {
      this.firebase
        .list("inst1/tx/" + year + "/areas")
        .query.orderByChild("bnm_profile/code")
        .equalTo(code)
        .once("value")
        .then((snapshots) => {
          let maps: any[] = [];
          snapshots.forEach((snapshot) => {
            maps.push({
              key: snapshot.key,
              ...snapshot.val(),
            });
          });
          res(maps);
        })
        .catch((e) => {
          rej(e);
        });
    });
  }

  getinforwindows(key:any) {
    let url = 'https://asia-southeast2-brr-farmluck.cloudfunctions.net/dbcps/getlandnobyitid?itid='+key+'';

    fetch(url)
      .then(res => res.json())
      .then((out) => {
        // console.log('DATA From SQL:.=>', out);    
        var output = out;
        return output
      })
      .catch(err => { throw err });
  }

  getmapByroute(year: any, supzone: any, root: any) {
    return new Promise((res, rej) => {
      this.firebase
        .list("inst1/tx/" + year + "/areas")
        .query
        .orderByChild("DetailPlant/ZoneId")
        .equalTo(supzone)
        .once("value")
        .then((snapshots) => {
          let maps: any = []
          snapshots.forEach((snapshots => {
            let rec = {
              key: snapshots.key,
              ...snapshots.val()
            }
            if (rec.DetailPlant.Root == root && rec.landno != '' && rec.DetailPlant.CaneTypeId !== 'OT' && rec.approveSts == 1 ) 
            {
              maps.push(rec)
            }
            
          }))
          res(maps)
        }).catch((e) => {
          rej(e)
        })
    })
  }

  

  
}
