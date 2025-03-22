import { Component, OnInit, } from '@angular/core';
import { AuthService } from '../auth.service';
import { BaseService } from '../base.service';
import { firstValueFrom } from 'rxjs';
import { WebshopService } from '../webshop.service';
interface NewItem {
  alt:string,
  ar:Number,
  id:string, 
  nev:string, 
  path:string,
  tipus:string 
}
@Component({
  selector: 'app-admin',
  standalone: false,
  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  Items:NewItem[]=[]
  req:any[]=[]
  Item = {
    alt:'',
    ar:null,
    id:null, 
    nev:'', 
    path:'',
    tipus:'' 
  };
  loggedUser: any;
  users: any;
  newItem = { alt:'', ar:null,id:null, nev:'', path:'',tipus:'' }
  
  constructor(private auth: AuthService, private base: BaseService,private web:WebshopService) {
    this.auth.getLoggedUser().subscribe(
      (loggedUser) => {
        this.loggedUser = loggedUser;
        console.log('Users logged', this.loggedUser);
        if (this.loggedUser) this.auth.getUsers()?.subscribe(
          (users) => this.users = users
        )
      }
    )
  }
  ngOnInit(): void {
      this.getRequestedSettlements()
      this.loadItems()
  }
  setCustomClaims(uid: any, claims: any) {
    this.auth.setUserClaims(uid, claims)?.subscribe(
      () => console.log('Claims beállítás!')
    )
  }

  change(uid: any) {
    let tomb = this.users.filter(
      (elem: any) => elem.uid == uid
    )
    console.log(tomb);
    this.auth.setUserClaims(uid, tomb[0].claims)?.subscribe();
  }
  getRequestedSettlements(){
    this.base.getRequestSettlement().subscribe(res=>{this.req=res})
  }
  async transferSettlement() {
    try {
      const settlements = await firstValueFrom(this.base.getRequestSettlement());
  
      if (settlements.length === 0) {
        alert('Nincs átküldhető adat.');
        return;
      }
      const settlement = settlements[0]; 
      await firstValueFrom(this.base.updateSettlement(settlement.id, settlement));
      this.RejectSettlement(settlement.id)
      alert('Adat sikeresen átküldve a végleges helyre és sikeresen törölve a ideiglenes helyről.');
    } catch (error) {
      alert('Hiba történt az adat átküldésekor.');
    }
  }
  RejectSettlement(id: string): void {
    this.base.DeleteRequestedSettlement(id).subscribe(() => {
    this.getRequestedSettlements();
    });
  }
loadItems(): void {
  this.web.getAllItems().subscribe({
    next: (res) => this.Items = Array.isArray(res) ? res : Object.values(res),
    error: (err) => console.error('Hiba a tételek betöltésekor:', err)
  });
}
async addNewItem(): Promise<void> {
  // if(
  //   !newItem.alt || 
  //   !newItem.ar ||
  //   !newItem.nev ||
  //   !newItem.path ||
  //   !newItem.tipus
  // ){
  //   alert('Nem adható meg üres vagy 0 érték!');
  //    return;
  // }
 

  try {
    await this.web.createItem( this.newItem);
    this.Item = {
      id:null,
      alt: '',
      ar: null,
      nev: '',
      path: '',
      tipus: ''
    }
    
  } catch (error) {
    console.error('Hiba történt a mentéskor:', error);
  }
}

// filterText(event: KeyboardEvent): void {
//   const input = event.target as HTMLInputElement;
//   input.value = input.value.replace(/[^a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]/g, '');
//   this.settlements.Helysegnev = input.value;
// }
  updateItem(item: any): void {
    this.web.updateItem(item.id, item).subscribe({
      next: (response) => {
        console.log("Sikeres frissítés:", response);
      },
      error: (error) => {
        console.error("Hiba a frissítés során:", error);
      }
    });
  }
  
  deleteItem(id: string): void {
    this.web.deleteItem(id).subscribe(() => this.loadItems());
    
  }
}
