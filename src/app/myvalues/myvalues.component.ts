import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myvalues',
  templateUrl: './myvalues.component.html',
  styleUrls: ['./myvalues.component.css']
})
export class MyvaluesComponent implements OnInit {

  valuesList: any;

  constructor( private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }
      getValues()
      {
        if(!localStorage.getItem("MyValues"))
        {
          this.http.get("https://localhost:44307/api/values").subscribe(x => 
          {
            localStorage.setItem("MyValues", JSON.stringify(x));
            this.valuesList = x;
          }, error =>{
            console.log(error);
          }
          
          )
        }
        else{
          this.valuesList = JSON.parse(localStorage.getItem("MyValues"));
        }
      }
}
