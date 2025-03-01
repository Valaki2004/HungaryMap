import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  standalone: false,
  
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
  @Input() isOpen = false;  
  @Input() selectedRegion = ''; 
  @Output() close = new EventEmitter<void>(); 

  constructor(private router:Router){}
  closePanel() {
    this.close.emit(); 
  }
  nograd(){
    this.router.navigate(["/nograd"])
  }
}
