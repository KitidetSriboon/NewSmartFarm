import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: "root",
})

export class Authenticationservice{
    decryptedInfo;
    userdata;
    Authention(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    let data = localStorage.getItem('userdata');
    var deData = CryptoJS.AES.decrypt(decodeURIComponent(data), 'bsfdev');
    this.decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    this.userdata = this.decryptedInfo.alldata[0];

    return this.userdata;
    }
    
}