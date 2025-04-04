import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { CardService } from '../card.service';
import { WebshopService } from '../webshop.service';
import { Subscription } from 'rxjs';
interface ShopData {
  nev: string;
  ar: number;
  kategoria: string;
  path: string;
  alt: string;
  maxDb: number;
  db: number;
}
@Component({
  selector: 'app-biciklik',
  standalone: false,
  
  templateUrl: './biciklik.component.html',
  styleUrl: './biciklik.component.css'
})
export class BiciklikComponent {
  shopDatas: ShopData[] = [];
  bikeDatas:any
  filteredShopDatas: ShopData[] = [];
  filterPriceValue: number | null = null;
  filterCategoryValue: string = '';
  cartCount: number = 0;
  filterOpen: boolean = false; 
  priceInvalid: boolean = false; 
  categoryInvalid: boolean = false; 
  card: any = [];
    subscription!: Subscription;

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
    this.webservice.getItemsByType("Bicikli").subscribe((res) => {
      this.shopDatas = Object.values(res);
      this.filteredShopDatas = [...this.shopDatas];
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
  BackBtn(){
    this.router.navigate( ['/shop']);
  }
}
