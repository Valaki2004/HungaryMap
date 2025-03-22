import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private databaseURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/osszeshely"
  private TemperarydatabaseURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/kertadat"
  private balatonURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/balaton"  
  private bigCities = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/nagyvarosok/osszeshelynagyvarosok.json"
  private backpackdataURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/Turafelszereles/taskak.json"
  private bikedataURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/Turafelszereles/biciklik.json"
  private shoesdataURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/Turafelszereles/cipok.json"
  private bedsdataURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/Turafelszereles/halozsakok.json"
  private tendsdataURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/Turafelszereles/satrok.json"
  private allstutffsdataURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/Turafelszereles/osszescucc.json"
  private lakedataURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/tavak"

  constructor(private http:HttpClient,private auth:AuthService){}

  getBigCities(){
    return this.http.get(this.bigCities)
  }
  getShopData(){
    return this.http.get(this.backpackdataURL)
  }
  getBikeData(){
    return this.http.get(this.bikedataURL)
  }
  getLakeDatas(){
    return this.http.get(`${this.lakedataURL}/.json`)
  }
  getShoesDatas(){
    return this.http.get(this.shoesdataURL)
  }
  getBedDatas(){
    return this.http.get(this.bedsdataURL)
  }
  getTendDatas(){
    return this.http.get(this.tendsdataURL)
  }
  getBalaton(){
    return this.http.get(this.balatonURL)
  }
  getAllItems(){
    return this.http.get(this.allstutffsdataURL)
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
  getCommentsByUser(email: string): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(
      `https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/comments.json`
    ).pipe(
      map(res => {
        if (!res) return []; 
        return Object.keys(res)
          .map(key => ({ id: key, ...res[key] }))
          .filter(comment => comment.Email === email);  
      })
    );
  }
}
