// import { Component, OnInit } from '@angular/core';
// import { BaseService } from '../base.service';

// import { AuthService } from '../auth.service';

// import { SearchService } from '../search.service';

// @Component({
//   selector: 'app-settlements',
//   standalone: false,
  
//   templateUrl: './settlements.component.html',
//   styleUrl: './settlements.component.css'
// })
// export class SettlementsComponent implements OnInit {
//   datas:any[]=[]
//   settlements={id:null,ESZ:null,Helysegnev:'',KH:null,eszaki_szelesseg_fok_perc:null,keleti_hossz_fok_perc:null} 
//   CurrentUser: any;
//   commentsString: any;
//   user:any
//   word:string=''

//   constructor(private base:BaseService, private auth:AuthService, private search:SearchService) {}
  
//   ngOnInit(){
//       this.getDatas()
//       this.auth.getCurrentUser().subscribe(user => {
//         this.user = user
//       })

//     }
  
//   getDatas(){
//     this.base.getDatas().subscribe((res)=>{
//       this.datas=res
//     })
//     this.search.getSearchWord().subscribe(
//       (res)=>this.word=res)
//   }
//   addSettlement() {
//         this.base.createSettlement(this.settlements).subscribe({
//       next: () => {
//         console.log('Település sikeresen hozzáadva!');
//         this.getDatas(); 
//         this.settlements = { 
//           id: null,
//           Helysegnev: '',
//           KH: null,
//           keleti_hossz_fok_perc: null,
//           ESZ: null,
//           eszaki_szelesseg_fok_perc: null
//         };
//       },
//     });
//   }
//   updateSettlement(settlement: any) {
//     if (!settlement.id) {
//       console.error("Hiba: Az azonosító hiányzik!", settlement);
//       return;
//     }
//     this.base.updateSettlement(settlement.id, settlement).subscribe(() => {
//       console.log("Sikeres frissítés:", settlement);
//       this.getDatas(); 
//     }, error => {
//       console.error("Hiba a frissítés során:", error);
//     });
//   }
//   deleteSettlement(id:string){
//     this.base.deleteSettlement(id).subscribe(()=>this.getDatas())
//   }
//   onKeyUp(event:any){
//     console.log(event.target.value)
//     this.search.setSearchWord(event.target.value)
//   }
// }
import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';

interface Settlement {
  Helysegnev: string;
  KH: number;
  keleti_hossz_fok_perc: number;
  ESZ: number;
  eszaki_szelesseg_fok_perc: number;
  id: string;
}

@Component({
  selector: 'app-settlements',
  standalone: false,
  
  templateUrl: './settlements.component.html',
  styleUrl: './settlements.component.css'
})
export class SettlementsComponent implements OnInit {
  datas: Settlement[] = []; // Firebase-ből lekért adatok
  paginatedDatas: Settlement[] = []; // A lapozott adatok
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;
  word: string = ''; // Keresési kulcsszó

  constructor(private baseService: BaseService) { }

  ngOnInit(): void {
    this.getModifiedDatas(); // Firebase adatok lekérése
  }

  getModifiedDatas(): void {
    this.baseService.getDatas().subscribe((data: Settlement[]) => {
      this.datas = data; // Firebase-ből lekért adatok
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const filteredDatas = this.word 
      ? this.datas.filter(data => data.Helysegnev.toLowerCase().includes(this.word.toLowerCase())) 
      : this.datas;

    this.totalPages = Math.ceil(filteredDatas.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDatas = filteredDatas.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onKeyUp(event: any): void {
    this.word = event.target.value;
    this.currentPage = 1; // Vissza az első oldalra kereséskor
    this.updatePagination();
  }

  updateSettlement(data: Settlement): void {
    console.log('Frissítés:', data);
  }

  deleteSettlement(id: string): void {
    this.baseService.deleteSettlement(id).subscribe(() => {
      this.getModifiedDatas(); // Újra lekérjük az adatokat a törlés után
    });
  }

  addSettlement(): void {
    const newSettlement: Settlement = {
      Helysegnev: `Új Település ${this.datas.length + 1}`,
      KH: 0,
      keleti_hossz_fok_perc: 0,
      ESZ: 0,
      eszaki_szelesseg_fok_perc: 0,
      id: `id-${this.datas.length + 1}`
    };
    this.baseService.createSettlement(newSettlement).subscribe(() => {
      this.getModifiedDatas(); // Új adat hozzáadása után újra lekérjük az adatokat
    });
  }
}