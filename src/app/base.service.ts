import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private databaseURL="http://localhost:3000/osszeshely"
  constructor(private http:HttpClient){}

  getDatas(): Observable<any> {
    return this.http.get(this.databaseURL)
  }
}


