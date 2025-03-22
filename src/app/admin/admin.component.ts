import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: false,
  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  req:any[]=[]
  loggedUser: any;
  users: any;
  
  constructor(private auth: AuthService, private base: BaseService, private router:Router) {
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
}
