import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom, map, observable, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public json = {
    currList: [
      'INR/USD',
      'INR/EURO',
      'INR/SGD',
      'INR/AUD',
      'INR/GBP'
    ],
  };
  public states:any = [];
  public status = false;
  public apiKey = 'fb699f9c5a43d5d4a7f2';
  public query = '';
  public url ='';
  public val =  new Observable<string>((observer: Observer<string>) => {
    //setInterval(() => observer.next(new Date().toString()), 1000);
  });

  constructor(private http: HttpClient){

  }

  public getStatus(): void {
    if(!this.status){
      this.processJson();
    } else {
      this.url = '';
    }
    this.status = !this.status;
  }

  public processJson() {
    this.states=[];
    this.json.currList.forEach(_=>{
      this.states.push({
        name:_.split("/")[1],
        value: new Observable<string>()
      });
    });
  }

  // public getCUR(): void {
  //   //this.query = this.getQuery(this.usd());
  // }

  public async getCUR(url: string, options?: any) {
    //this.states.find((_: any)=>_===options);
    // this.http.get(url).pipe(map(data => {
    //   this.val = data;
    //   console.log(data);
    // }))
    const value$ =  this.http.get(url);
    return await lastValueFrom(value$);
  }

  public async getUrl(key:string):Promise<void>{
  // this.url='https://free.currconv.com/api/v7/convert?q=' + this.getQuery(key) +  '&compact=ultra&apiKey=' +  this.apiKey;
  this.url='https://api.publicapis.org/entries';
    await this.getCUR(this.url,key).then((v)=>{
      this.states.find((_: any)=>_===key).value.next(v);
      debugger;
    }
    );
  }

  public getQuery(key: string): string {
    return 'INR_' + key;
  }
}
