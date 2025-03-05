import { Component,  OnInit, } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
  regionName1  = ''
  regionName2 = ''
  regionName3 = ''
  regionName4 = ''
  regionName5 = ''
  constructor(private http:HttpClient,private base: BaseService,private route:ActivatedRoute) {} 
  ngOnInit(){
      this.getDatas()
      this.route.paramMap.subscribe(params => {
        this.regionName1 = params.get(this.regionName1) || '';
        this.regionName2 = params.get(this.regionName2) || '';
        this.regionName3 = params.get(this.regionName3) || '';
        this.regionName4 = params.get(this.regionName4)|| '';
        this.regionName5 = params.get(this.regionName5) || '';
      });
      
  }
  getDatas() {
    this.http.get("https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/nagyvarosok.json")
      .subscribe((data: any) => {
        if (data && data.osszeshelynagyvarosok && Array.isArray(data.osszeshelynagyvarosok)) {
          this.datas = data.osszeshelynagyvarosok;
          this.addCirclesToSvg(); 
        } else {

          this.datas = [];
        }
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
  convertDegreesMinutesToDecimal(degreesMinutes: string): number {
    const parts = degreesMinutes.split(':');
    const degrees = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]);
    return degrees + (minutes / 60);
  }
  
  addCirclesToSvg() {
    
    if (!this.datas || this.datas.length === 0) {
      return;
    }
  
    const svgElement = document.getElementById('map');
    if (!svgElement) {
      return;
    }
    const minLong = 16;
    const maxLong = 22;
    const minLat = 45;
    const maxLat = 49;
    const svgWidth = 800;
    const svgHeight = 750;
    const offsetX = 30;
    const offsetY = -40;
  
    this.datas.forEach((helyseg: any) => {
      const helysegNev = helyseg['Helysegnev'];
      if (!helyseg['KH'] || !helyseg['ESZ']) {
        return;
      }
      const hossz = parseFloat(helyseg['KH']);
      const szel = parseFloat(helyseg['ESZ']);
      let hosszDecimal = isNaN(hossz) ? this.convertDegreesMinutesToDecimal(helyseg['keleti_hossz_fok_perc']) : hossz;
      let szelDecimal = isNaN(szel) ? this.convertDegreesMinutesToDecimal(helyseg['eszaki_szelesseg_fok_perc']) : szel;
      if (isNaN(hosszDecimal) || isNaN(szelDecimal)) {
        return;
      }
      const cx = (hosszDecimal - minLong) / (maxLong - minLong) * svgWidth + offsetX;
      const cy = svgHeight - ((szelDecimal - minLat) / (maxLat - minLat) * svgHeight) + offsetY;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', cx.toString());
      circle.setAttribute('cy', cy.toString());
      circle.setAttribute('r', '3');
      circle.setAttribute('fill', 'black');
      circle.setAttribute('stroke', 'black');
      circle.setAttribute('stroke-width', '5');
      circle.setAttribute('id', helysegNev);
      
      circle.addEventListener('mouseover', (event: MouseEvent) => {
        this.showText(event, helysegNev);
      });
  
      circle.addEventListener('mouseout', () => {
        this.hideText();
      });

      svgElement.appendChild(circle);
    });
  }
  
}