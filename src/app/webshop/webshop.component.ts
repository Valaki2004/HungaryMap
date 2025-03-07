import { Component, Input, input, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-webshop',
  standalone: false,
  
  templateUrl: './webshop.component.html',
  styleUrl: './webshop.component.css'
})
export class WebshopComponent implements OnInit {
  shopDatas:any

  constructor(private base:BaseService){}

  ngOnInit(): void {
    this.loadShopData()
}
loadShopData(){
  this.base.getShopData().subscribe((res)=> this.shopDatas=res)
}


}
