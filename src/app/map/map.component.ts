import { AfterViewChecked, Component,  ElementRef,  OnInit, ViewChild, } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewChecked  {
  Citydatas : any;
  datas : any;
  isAdded = false;
  hoverEnabled =true;
  circles: string[] = [];
  isVisible = true;
  Text = '';
  X = 0;
  Y = 0;
  panelOpen = false;  
  selectedRegion = '';
  currentMap: string = 'map1';
  private scale: number = 1; 
  private viewBoxBase: [number, number, number, number] = [50, 0, 3100, 1900];
  public viewBox: string = `50 0 3100 1900`; 
  private minScale: number = 1500 / 1500; 
  private maxScale: number = 5;
  private isDragging: boolean = false;
  private dragStart: { x: number, y: number } | null = null;
  regionName1  = ''
  regionName2 = ''
  regionName3 = ''
  regionName4 = ''
  regionName5 = ''
  constructor(private base: BaseService,private route:ActivatedRoute,private router:Router) {}

  ngOnInit(){
      this.getDatas()
      this.getBigCitiesDatas()
      this.route.paramMap.subscribe(params => {
        this.regionName1 = params.get(this.regionName1) || '';
        this.regionName2 = params.get(this.regionName2) || '';
        this.regionName3 = params.get(this.regionName3) || '';
        this.regionName4 = params.get(this.regionName4) || '';
        this.regionName5 = params.get(this.regionName5) || '';
      });
  }
  ngAfterViewChecked() {
    this.addCirclesToSvg()
    
  }
  getDatas() {
    this.base.getDatas().subscribe((res)=>{
      this.datas=res
    })
  }
  getBigCitiesDatas() {
    this.base.getBigCities().subscribe((res)=>{
      this.Citydatas=res
      console.log(this.Citydatas)
    })
  }
  convertDegreesMinutesToDecimal(degreesMinutes: string): number {
    const parts = degreesMinutes.split(':');
    const degrees = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]);
    return degrees + (minutes / 60);
  }
  
  addCirclesToSvg() {    
    const svgElement = document.getElementById('map1');
    if (!svgElement) {
      return;
    }
    const minLong = 16.27;
    const maxLong = 22.2;
    const minLat = 45.2;
    const maxLat = 48.75;
    const svgWidth = 947;
    const svgHeight = 799;
    const offsetX = 98;
    const offsetY = 15;
  
    this.Citydatas.forEach((helyseg: any) => {
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
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', 'grey');
      
      circle.setAttribute('stroke-width', '10');
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
  addAllToSvg(svgElement: HTMLElement) {
    const minLong = 16.27;
    const maxLong = 22.2;
    const minLat = 45.2;
    const maxLat = 48.75;
    const svgWidth = 947;
    const svgHeight = 799;
    const offsetX = 98;
    const offsetY = 15;
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
      const circleId = `circle-${helysegNev}`; 
      circle.setAttribute('cx', cx.toString());
      circle.setAttribute('cy', cy.toString());
      circle.setAttribute('r', '2.3');
      circle.setAttribute('fill', 'black');
      circle.setAttribute('stroke-width', '10');
      circle.setAttribute('id', circleId); 
      circle.addEventListener('mouseover', (event: MouseEvent) => {
        this.showText(event, helysegNev);
      });
      circle.addEventListener('mouseout', () => {
        this.hideText();
      });
      svgElement.appendChild(circle);
      this.circles.push(circleId); 
    });
  }
  toggleCircles() {
    const svgElement = document.getElementById('map1');
    if (!svgElement) return;
    if (this.isAdded) {
      this.circles.forEach(circleId => {
        const circle = document.getElementById(circleId);
        if (circle) {
          svgElement.removeChild(circle); 
        }
      });
      this.circles = [];  
    } else {
      this.addAllToSvg(svgElement);
    }
    this.isAdded = !this.isAdded; 
  }
  toggleMegyeEffect() {
    this.hoverEnabled = !this.hoverEnabled;
  }
  onMouseUp(): void {
    this.isDragging = false;
    this.dragStart = null;
  }
  onMouseLeave(): void {
    this.isDragging = false;
    this.dragStart = null;
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
  allSettlemenetNavigateBtn(){
    this.router.navigate( ['/settlements']);
  }
}