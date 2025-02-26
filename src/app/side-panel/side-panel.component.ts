import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  standalone: false,
  
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
  @Input() isOpen = false;  // Fogadja az állapotot
  @Input() selectedRegion = ''; // Fogadja a kiválasztott megyét
  @Output() close = new EventEmitter<void>(); // Kimenő esemény a bezáráshoz

  closePanel() {
    this.close.emit(); // Kiírja a szülő komponensnek, hogy be kell zárni
  }
}
