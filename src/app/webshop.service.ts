import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebshopService {

  private allstutffsdataURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/Turafelszereles/osszescucc"

  constructor(private http:HttpClient,private auth:AuthService) { }
  getAllItems(){
    return this.http.get(`${this.allstutffsdataURL}/.json`)
  }
  getItemsByType(tipus: string) {
    return this.http.get(`${this.allstutffsdataURL}/.json?orderBy="tipus"&equalTo="${tipus}"`);
  }
  
    async createItem(newItem: any) {
      try {
        const currentUser = await firstValueFrom(this.auth.getCurrentUser());
    
        if (!currentUser || !currentUser.email) {
          throw new Error('Nincs bejelentkezett felhasználó!');
        }
        const email = currentUser.email;
        if (
          !newItem.alt || 
          !newItem.ar ||
          !newItem.nev ||
          !newItem.path ||
          !newItem.tipus
        ) {
          throw new Error('Nem adható meg üres vagy 0 érték!');
        }
        const itemsSnapshot = await firstValueFrom(
          this.http.get<{ [key: string]: any }>(`${this.allstutffsdataURL}.json`)
        );
        const existingIds = Object.keys(itemsSnapshot || {}).map(id => parseInt(id, 10));
        const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
        const payload = {
          id: newId,
          alt: newItem.alt || '',
          ar: newItem.ar || null,
          nev: newItem.nev || '',
          path: newItem.path || '',
          tipus: newItem.tipus,
          email: email,
          createdAt: new Date().toISOString()
        };
        console.log('Payload:', payload);
        const response = await firstValueFrom(
          this.http.put(`${this.allstutffsdataURL}/${newId}.json`, payload)
        );
        console.log('Válasz a szervertől:', response);
        return payload;
      } catch (error) {
        console.error('Hiba a tárgy mentésekor:', error);
        throw error;
      }
    }    
    updateItem(id:string, item:any){
      return this.http.patch(`${this.allstutffsdataURL}/${id}.json`,item);
  }
    deleteItem(id:string){
      return this.http.delete(`${this.allstutffsdataURL}/${id}.json`);
    }
}
