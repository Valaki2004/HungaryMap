import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  kereso = new BehaviorSubject<string>(''); 
  categoryFilter = new BehaviorSubject<string>(''); 
  priceFilter = new BehaviorSubject<number | null>(null); 

  getSearchWord() {
    return this.kereso;
  }

  setSearchWord(keresoSzo: string) {
    this.kereso.next(keresoSzo);
  }

  getCategoryFilter() {
    return this.categoryFilter;
  }

  setCategoryFilter(category: string) {
    this.categoryFilter.next(category);
  }

  getPriceFilter() {
    return this.priceFilter;
  }

  setPriceFilter(price: number) {
    this.priceFilter.next(price);
  }
}
