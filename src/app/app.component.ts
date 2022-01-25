import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom, observable, Observable, Observer, of, share, Subscription } from 'rxjs';
import { map } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  public json = {
    currList: [
      'INR/USD',
      'INR/EUR',
      'INR/SGD',
      'INR/AUD',
      'INR/GBP'
    ],
  };
  public name="";
  public states:any = [];
  public status = false;
  public apiKey = 'fb699f9c5a43d5d4a7f2';
  public query = '';
  public url ='';
  public curTable: any;
  public myDate :any;
  public i=0;

  constructor(private http: HttpClient){
    // setInterval(() => {
    //   this.getStatus(true);
    // }, 1000);
    // //this.getAsyncData();
  }

  getAsyncData() {
    // Fake Slow Async Data
    const value$ =  this.http.get('https://www.boredapi.com/api/activity');
   return value$;
 }

  ngOnInit() {
  }

  public getStatus(refresh = false): void {
    if(!this.status && !refresh){
      this.processJson();
    } else {
      this.url = '';
    }
    if(!refresh){
      this.status = !this.status;
    }
  }

  public processJson() {
    this.states=[];
    this.json.currList.forEach(_=>{
      const name = _.split("/")[1];
      this.states.push({
        name: name,
        value: this.getUrl(name)
      });
      // this.states.push({
      //   name: name,
      //   value: this.i++
      // });
    });
  }

  public async getCUR(url: string, options?: any) {
    const value$ =  this.http.get(url);
    return await lastValueFrom(value$);
  }

  public async getUrl(key:string):Promise<void>{
  this.url='https://free.currconv.com/api/v7/convert?q=' + this.getQuery(key) +  '&compact=ultra&apiKey=' +  this.apiKey;
    await this.getCUR(this.url,key).then((v)=>{
      this.states.find((_: any)=>_.name===key).value =  Object.values(v)[0];
    }
    );
  }

  public getQuery(key: string): string {
    return 'INR_' + key;
  }
}
