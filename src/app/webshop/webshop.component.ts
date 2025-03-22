import { Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card.service';
import { WebshopService } from '../webshop.service';

interface ShopData {
  id?: string;
  nev: string;
  ar: number;
  kategoria: string;
  path: string;
  alt: string;
  maxDb: number;
  db: number;
}
interface Settlement {
  Helysegnev: string;
  KH: number;
  keleti_hossz_fok_perc: number;
  ESZ: number;
  eszaki_szelesseg_fok_perc: number;
  szeletseg: number | null;
  id: string;
}
@Component({
  selector: 'app-webshop',
  templateUrl: './webshop.component.html',
  styleUrls: ['./webshop.component.css'],
  standalone: false
})
export class WebshopComponent implements OnInit {
  shopDatas: ShopData[] = [];
  filteredShopDatas: ShopData[] = [];
  filterPriceValue: number | null = null;
  filterCategoryValue: string = '';
  cartCount: number = 0;
  filterOpen: boolean = false;
  priceInvalid: boolean = false;
  categoryInvalid: boolean = false;
  @Input() selectedCategory = '';
  

  constructor(private webservice: WebshopService, private router: Router, private crd: CardService) {}

  ngOnInit(): void {
    this.loadShopData();
    this.crd.getCart().subscribe((cart: any) => {
      this.cartCount = cart.length;
    });
  }
  toggleFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  loadShopData() {
    this.webservice.getAllItems().subscribe((res) => {
      this.shopDatas = Object.values(res);
      this.filteredShopDatas = [...this.shopDatas];
    });
  }

  filterPrice(event: Event): void {
    const price = (event.target as HTMLInputElement)?.value;
    if (price && isNaN(parseInt(price, 10))) {
      this.priceInvalid = true;
    } else {
      this.priceInvalid = false;
      this.filterPriceValue = price ? parseInt(price, 10) : null;
      this.applyFilters();
    }
  }

  filterCategory(event: Event): void {
    const category = (event.target as HTMLInputElement)?.value || '';
    this.categoryInvalid = category.length === 0;
    this.filterCategoryValue = category;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredShopDatas = this.shopDatas.filter((item: ShopData) => {
      let matchesPrice = true;
      let matchesCategory = true;

      if (this.filterPriceValue !== null) {
        matchesPrice = item.ar <= this.filterPriceValue;
      }

      if (this.filterCategoryValue) {
        matchesCategory = item.kategoria.toLowerCase().includes(this.filterCategoryValue.toLowerCase());
      }

      return matchesPrice && matchesCategory;
    });
  }

  viewCart(): void {
    this.router.navigate(['/card']);
  }

  addStuff(element: any, db: number): void {
    this.crd.addElement(element, db);
  }
  SelectCategory(event:Event){
    const category = (event.target as HTMLSelectElement).value;
    if (category) {
      this.router.navigate([`/${category}`]);
    } else {
      this.router.navigate(['/']); 
    }
  }
 
}