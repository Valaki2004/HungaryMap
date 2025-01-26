import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-settlements',
  standalone: false,
  
  templateUrl: './settlements.component.html',
  styleUrl: './settlements.component.css'
})
export class SettlementsComponent implements OnInit {
  datas = []

  constructor(private base:BaseService){}

  ngOnInit(): void {
    this.base.getDatas().subscribe(res => {
      this.datas = res;
    });
  }
}
