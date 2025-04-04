import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card.service';
import { WebshopService } from '../webshop.service';
import { Subscription } from 'rxjs';

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

@Component({
  selector: 'app-webshop',
  templateUrl: './webshop.component.html',
  styleUrls: ['./webshop.component.css'],
  standalone: false
})
export class WebshopComponent implements OnInit {
  shopDatas: any[] = [];
  datas:any[] = []
  filteredShopDatas: ShopData[] = [];
  maxPrice: number = 200000;
  filterPriceValue: number | null = null;
  filterCategoryValue: string = '';
  cartCount: number = 0;
  filterOpen: boolean = false;
  priceInvalid: boolean = false;
  categoryInvalid: boolean = false;
  card: any = [];
  subscription!: Subscription;
  @Input() selectedCategory = '';

  constructor(private webservice: WebshopService, private router: Router, private crd:CardService) {}

  ngOnInit(): void {
    this.loadShopData();
    this.crd.getCart().subscribe((cart: any) => {
      this.cartCount = cart.length;
    });
    this.subscription = this.crd.getCart().subscribe(
      (res) => this.card = res || []
    );
  }

  toggleFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  loadShopData() {
    this.webservice.getAllItems().subscribe((res:any) => {
      this.shopDatas = Object.values(res).filter((data:any)=> data != null);
      this.filteredShopDatas = [...this.shopDatas];
    });
  }

  filterPrice(event: Event): void {
    const price = (event.target as HTMLInputElement)?.value;
    const parsedPrice = parseInt(price, 10);

    if (!isNaN(parsedPrice) && parsedPrice >= 0) {
      this.maxPrice = parsedPrice;
      this.priceInvalid = false;
      this.filterPriceValue = parsedPrice;
    } else {
      this.priceInvalid = true;
      this.filterPriceValue = null;
    }
    
    this.applyFilters();
  }

  filterCategory(event: Event): void {
    const category = (event.target as HTMLSelectElement).value || '';
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
    db = 1 
    this.crd.addElement(element, db);
  }

  SelectCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    if (category) {
      this.router.navigate([`/${category}`]);
    } else {
      this.router.navigate(['/']);
    }
  }
  price(element: any): number {
    return Number(element.db) * Number(element.ar);
  }
  getTotalPrice(): number {
    return this.card.reduce((total: number, item: any) => {
      const validPrice = this.getValidPrice(item);
      return total + validPrice;
    }, 0);
  }
  
  getValidPrice(item: any): number {
    if (!item || item.ar === undefined || item.ar === null || item.ar === '') {
      return 1;
    }
    const price = Number(item.ar);
    return isNaN(price) ? 1 : price;
  }
}
