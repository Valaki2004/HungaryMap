import { Component,  OnInit, } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: false,
  
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit  {
  datas : any;
  isVisible = true;
  Text = '';
  X = 0;
  Y = 0;
  panelOpen = false;  
  selectedRegion = '';
  constructor(private http:HttpClient,private base: BaseService) {} 
  ngOnInit(){
    this.getDatas()
  
  }
  getDatas() {
    this.http.get("https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/osszeshely.json")
      .subscribe((data: any) => {
        this.datas = Object.values(data);
        console.log(this.datas); 
        
      }, (error) => {
        console.error("Error loading data", error); 
      });
  }
  showText(event: MouseEvent, text: string) {
    this.Text = text;
    this.isVisible = true;
    this.moveText(event);
  }
  moveText(event: MouseEvent) {
    this.X = event.clientX +15;  
    this.Y = event.clientY +10;  
  }
  hideText() {
    this.isVisible = false;
  }
  selectRegion(region: string) {
    this.selectedRegion = region;
    this.panelOpen = false;
    setTimeout(() => {
      this.panelOpen = true;
    }, 10);
  }
  closePanel() {
    this.panelOpen = false;
  }
  // convertDegreesMinutesToDecimal(degreesMinutes: string): number {
  //   const parts = degreesMinutes.split(':');
  //   const degrees = parseFloat(parts[0]);
  //   const minutes = parseFloat(parts[1]);
  //   return degrees + (minutes / 60);
  // }
  
  // addCirclesToSvg() {
    
  //   if (!this.datas || this.datas.length === 0) {
  //     return;
  //   }
  
  //   const svgElement = document.getElementById('map');
  //   if (!svgElement) {
  //     return;
  //   }
  
  //   const minLong = 16;
  //   const maxLong = 22;
  //   const minLat = 45;
  //   const maxLat = 49;
  //   const svgWidth = 800;
  //   const svgHeight = 750;
  //   const offsetX = 45;
  //   const offsetY = -50;
  
  //   this.datas.forEach((helyseg: any) => {
  //     const helysegNev = helyseg['Helysegnev'];
  //     if (!helyseg['KH'] || !helyseg['ESZ']) {
  //       console.warn(`Missing coordinates for ${helysegNev}`);
  //       return;
  //     }
  //     const hossz = parseFloat(helyseg['KH']);
  //     const szel = parseFloat(helyseg['ESZ']);
  //     let hosszDecimal = isNaN(hossz) ? this.convertDegreesMinutesToDecimal(helyseg['keleti_hossz_fok_perc']) : hossz;
  //     let szelDecimal = isNaN(szel) ? this.convertDegreesMinutesToDecimal(helyseg['eszaki_szelesseg_fok_perc']) : szel;
  //     if (isNaN(hosszDecimal) || isNaN(szelDecimal)) {
  //       console.warn(`Invalid coordinates for ${helysegNev}: (${hosszDecimal}, ${szelDecimal})`);
  //       return;
  //     }
  //     const cx = (hosszDecimal - minLong) / (maxLong - minLong) * svgWidth + offsetX;
  //     const cy = svgHeight - ((szelDecimal - minLat) / (maxLat - minLat) * svgHeight) + offsetY;
  //     const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  //     circle.setAttribute('cx', cx.toString());
  //     circle.setAttribute('cy', cy.toString());
  //     circle.setAttribute('r', '3');
  //     circle.setAttribute('fill', 'black');
  //     circle.setAttribute('stroke', 'black');
  //     circle.setAttribute('stroke-width', '1');
  //     circle.setAttribute('id', helysegNev);
  
  //     svgElement.appendChild(circle);
  //   });
  // }
  
}