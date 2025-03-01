import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-settlements',
  standalone: false,
  
  templateUrl: './settlements.component.html',
  styleUrl: './settlements.component.css'
})
export class SettlementsComponent implements OnInit {
  datas:any[]=[]
  settlements={id:null,ESZ:null,Helysegnev:'',KH:null,eszaki_szelesseg_fok_perc:null,keleti_hossz_fok_perc:null} 
  CurrentUser: any;
  commentsString: any;
  user:any
  word:string=''

  constructor(private base:BaseService, private auth:AuthService, private search:SearchService) {}
  
  ngOnInit(){
      this.getDatas()
      this.auth.getCurrentUser().subscribe(user => {
        this.user = user
      })

    }
  
  getDatas(){
    this.base.getDatas().subscribe((res)=>{
      this.datas=res
    })
    this.search.getSearchWord().subscribe(
      (res)=>this.word=res)
  }
  addSettlement() {
        this.base.createSettlement(this.settlements).subscribe({
      next: () => {
        console.log('Település sikeresen hozzáadva!');
        this.getDatas(); 
        this.settlements = { 
          id: null,
          Helysegnev: '',
          KH: null,
          keleti_hossz_fok_perc: null,
          ESZ: null,
          eszaki_szelesseg_fok_perc: null
        };
      },
    });
  }
  updateSettlement(settlement: any) {
    if (!settlement.id) {
      console.error("Hiba: Az azonosító hiányzik!", settlement);
      return;
    }
    this.base.updateSettlement(settlement.id, settlement).subscribe(() => {
      console.log("Sikeres frissítés:", settlement);
      this.getDatas(); 
    }, error => {
      console.error("Hiba a frissítés során:", error);
    });
  }
  deleteSettlement(id:string){
    this.base.deleteSettlement(id).subscribe(()=>this.getDatas())
  }
  onKeyUp(event:any){
    console.log(event.target.value)
    this.search.setSearchWord(event.target.value)
  }


}
