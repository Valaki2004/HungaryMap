import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private databaseURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/osszeshely"
  private TemperarydatabaseURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/kertadat"
  private balatonURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/balaton"  
  private bigCities = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/nagyvarosok/osszeshelynagyvarosok.json"
  private lakedataURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/tavak"

  constructor(private http:HttpClient,private auth:AuthService, private db:AngularFireDatabase){}

  
  getBigCities(){
    return this.http.get(this.bigCities)
  }
  getLakeDatas(){
    return this.http.get(`${this.lakedataURL}/.json`)
  }
  getBalaton(){
    return this.http.get(this.balatonURL)
  }
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
  getDatasForMap(){
    return this.http.get(this.databaseURL)
  }
  async createSettlement(settlement: any) {
    try {
      const currentUser = await firstValueFrom(this.auth.getCurrentUser());
      if (!currentUser || !currentUser.email) {
        throw new Error('Nincs bejelentkezett felhasználó!');
      }
      const email = currentUser.email;
      if (
        !settlement.Helysegnev || 
        !settlement.KH ||
        !settlement.keleti_hossz_fok_perc ||
        !settlement.ESZ ||
        !settlement.eszaki_szelesseg_fok_perc ||
        !settlement.szeletseg
      ) {
        throw new Error('Nem adható meg üres vagy 0 érték!');
      }
      const payload = {
        Helysegnev: settlement.Helysegnev || '',
        KH: settlement.KH || null,
        keleti_hossz_fok_perc: settlement.keleti_hossz_fok_perc || null,
        ESZ: settlement.ESZ || null,
        eszaki_szelesseg_fok_perc: settlement.eszaki_szelesseg_fok_perc || null,
        szeletseg: settlement.szeletseg || null,
        email: email, 
        createdAt: new Date().toISOString()
      };
      console.log('Payload:', payload);
      const response = await firstValueFrom(this.http.post(`${this.TemperarydatabaseURL}/.json`, payload));
      console.log('Válasz a szervertől:', response);
      return payload;
    } catch (error) {
      console.error('Hiba a település mentésekor:', error);
      throw error;
    }
  }
  
  getRequestSettlement(): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(`${this.TemperarydatabaseURL}.json`).pipe(
      map((res) => {
        if (!res) return [];
        return Object.keys(res)
          .map((key) => ({
            id: key,
            ...res[key],
          }))
          .filter((item) => item.createdAt); 
      })
    );
  }
  
  DeleteRequestedSettlement(id:string){
    return this.http.delete(`${this.TemperarydatabaseURL}/${id}.json`)
  }

  updateSettlement(id:string, settlement:any){
    return this.http.patch(`${this.databaseURL}/${id}.json`,settlement);
}
  deleteSettlement(id:string){
    return this.http.delete(`${this.databaseURL}/${id}.json`);
  }
}
