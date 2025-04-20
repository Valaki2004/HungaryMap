import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseService } from '../base.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Settlement {
  Helysegnev: string;
  KH: number;
  keleti_hossz_fok_perc: number;
  ESZ: number;
  eszaki_szelesseg_fok_perc: number;
  szeletseg: number;
  id: string;
}

@Component({
  selector: 'app-settlements',
  standalone: false,
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.css']
})
export class SettlementsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  datas: Settlement[] = [];
  paginatedDatas: Settlement[] = [];
  settlements = {
    id: null,
    Helysegnev: '',
    KH: null,
    eszaki_szelesseg_fok_perc: null,
    keleti_hossz_fok_perc: null,
    ESZ: null,
    szeletseg: null  
  };
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 0;
  word: string = '';
  isVisible: boolean = false;
  user: any;
  selectedCity: string = '';
  moderator: any = null;
  admin: any = null; 

  constructor(private baseService: BaseService, private auth: AuthService,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.getModifiedDatas();
    this.auth.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.auth.getIsModerator().subscribe(moderator => {
      this.moderator = moderator;
    });
    this.auth.getIsAdmin().subscribe(admin => {
      this.admin = admin;
    });
  }

  getModifiedDatas(): void {
    this.baseService.getDatas().subscribe((data: Settlement[]) => {
      this.datas = data;
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
    this.currentPage = 1;
    this.updatePagination();
  }

  updateSettlement(settlement: any): void {
    if (!settlement.id) {
      console.error("Hiba: Az azonosító hiányzik!", settlement);
      return;
    }
    this.baseService.updateSettlement(settlement.id, settlement).subscribe(() => {
      console.log("Sikeres frissítés:", settlement);
      this.getModifiedDatas();
    }, error => {
      console.error("Hiba a frissítés során:", error);
    });
  }

  deleteSettlement(id: string): void {
    this.baseService.deleteSettlement(id).subscribe(() => {
      this.getModifiedDatas();
    });
  }

  async addSettlement(): Promise<void> {
    if (
      !this.settlements.Helysegnev  ||
      !this.settlements.KH ||
      !this.settlements.keleti_hossz_fok_perc ||
      !this.settlements.ESZ ||
      !this.settlements.eszaki_szelesseg_fok_perc ||
      !this.settlements.szeletseg
    ) {
      alert('Nem adható meg üres vagy 0 érték!');
      return;
    }
  
    try {
      await this.baseService.createSettlement(this.settlements); 
      this.getModifiedDatas();
      this.settlements = {
        id: null,
        Helysegnev: '',
        KH: null,
        keleti_hossz_fok_perc: null,
        ESZ: null,
        eszaki_szelesseg_fok_perc: null,
        szeletseg: null  
      };
    } catch (error) {
      alert('Hiba történt a település mentésekor.');
    }
  }
  filterText(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]/g, '');
    this.settlements.Helysegnev = input.value;
  }
  
  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  closePanel(): void {
    this.close.emit();
  }

  selectCity(cityName: string): void {
    this.selectedCity = cityName;
  }
  BackBtn(){
    this.router.navigate( ['/map']);
  }
  
  booking(){
    return this.http.get( `https://www.booking.com/searchresults.hu.html?ss=${this.datas}`)
  }
  // <a> href="https://www.booking.com/searchresults.hu.html?ss={{ data }}" target="cityWindow">{{ data }} </a>
}
