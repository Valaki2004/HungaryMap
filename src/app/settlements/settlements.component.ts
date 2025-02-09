import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settlements',
  standalone: false,
  
  templateUrl: './settlements.component.html',
  styleUrl: './settlements.component.css'
})
export class SettlementsComponent implements OnInit {
  datas:any=[]
  settlements={id:null,ESZ:null,Helysegnev:'',KH:null,eszaki_szelesseg_fok_perc:null,keleti_hossz_fok_perc:null} 

  constructor(private http:HttpClient,private base:BaseService){}
  
  ngOnInit(){
      this.getDatas()
  }
  
  getDatas(){
    this.base.getDatas().subscribe((res)=>{
      if(res){
        console.log(res)
        this.datas=res}})
  }
  addSettlement() {
    console.log('Hozzáadott település:', this.settlements); 
  
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
      this.getDatas(); // Újratöltjük az adatokat
    }, error => {
      console.error("Hiba a frissítés során:", error);
    });
  }
  deleteSettlement(id:string){
    this.base.deleteSettlement(id).subscribe(()=>this.getDatas())
  }
}
