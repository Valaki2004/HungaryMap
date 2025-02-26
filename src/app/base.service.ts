import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private databaseURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/osszeshely"
    private CommentURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/comments"
  constructor(private http:HttpClient){}

  getDatas(): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(`${this.databaseURL}.json`).pipe(
      map((res) => {
        if (!res) return []; 
  
        return Object.keys(res).map((key) => ({
          id: key, 
          ...res[key], 
        }));
      })
    );
  }
  createSettlement(settlement:any){
    const payload = {
      Helysegnev: settlement.Helysegnev || '',
      KH: settlement.KH || null,
      keleti_hossz_fok_perc: settlement.keleti_hossz_fok_perc || null,
      ESZ: settlement.ESZ || null,
      eszaki_szelesseg_fok_perc: settlement.eszaki_szelesseg_fok_perc || null
    };
    console.log(payload)
  
    return this.http.post(`${this.databaseURL}/.json`, payload);
  }
  getComments (){
    return this.http.get(`${this.CommentURL}/.json`);
  }
  createComment(comment:any){
    return this.http.post(`${this.databaseURL}/.json`, comment);
  }
  updateSettlement(id:string, settlement:any){
    return this.http.patch(`${this.databaseURL}/${id}.json`,settlement);
}
  deleteSettlement(id:string){
    return this.http.delete(`${this.databaseURL}/${id}.json`);
  }
}
