import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { AuthService } from '../auth.service';
import { BaseService } from '../base.service';
import { firstValueFrom, Observable } from 'rxjs';
import { WebshopService } from '../webshop.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  comments:any
  reports: any
  Items:any[]=[]
  req:any[]=[]
  Item:any = {
    alt:'',
    ar:null,
    id:null, 
    nev:'', 
    path:'',
    tipus:'' 
  };
  loggedUser: any;
  users: any;


  
  constructor(
    private auth: AuthService, 
    private base: BaseService,
    private web:WebshopService,
    private commentService: CommentService,
    private cdr:ChangeDetectorRef
  ) {
    this.auth.getLoggedUser().subscribe(
      (loggedUser) => {
        this.loggedUser = loggedUser;
        console.log('Users logged', this.loggedUser);
        if (this.loggedUser) this.auth.getUsers()?.subscribe(
          (users) => this.users = users
        )
      }
    )
  }
  ngOnInit(): void {
      this.getRequestedSettlements()
      this.loadItems()
      this.getReports()
      this.loadComments()
  }
  setCustomClaims(uid: any, claims: any) {
    this.auth.setUserClaims(uid, claims)?.subscribe(
      () => console.log('Claims beállítás!')
    )
  }

  change(uid: any) {
    let tomb = this.users.filter(
      (elem: any) => elem.uid == uid
    )
    console.log(tomb);
    this.auth.setUserClaims(uid, tomb[0].claims)?.subscribe();
  }
  loadComments() {
    this.commentService.getReportsWithComments().subscribe((res) => 
    this.comments = res    
    )}
  getRequestedSettlements(){
    this.base.getRequestSettlement().subscribe(res=>
      this.req=res
    )
  }
  async transferSettlement() {
    try {
      const settlements = await firstValueFrom(this.base.getRequestSettlement());
  
      if (settlements.length === 0) {
        alert('Nincs átküldhető adat.');
        return;
      }
      const settlement = settlements[0]; 
      await firstValueFrom(this.base.updateSettlement(settlement.id, settlement));
      this.RejectSettlement(settlement.id)
      alert('Adat sikeresen átküldve a végleges helyre és sikeresen törölve a ideiglenes helyről.');
    } catch (error) {
      alert('Hiba történt az adat átküldésekor.');
    }
  }
  RejectSettlement(id: string): void {
    this.base.DeleteRequestedSettlement(id).subscribe(() => {
    this.getRequestedSettlements();
    });
  }
loadItems(): void {
  this.web.getAllItems().subscribe((res:any)=>{
    this.Items = (res || []).filter((item:any)=>item != null)
  })
  ;
}
async addNewItem(): Promise<void> {
  if(
    !this.Item.alt || 
    !this.Item.ar ||
    !this.Item.nev ||
    !this.Item.path ||
    !this.Item.tipus
  ){
    alert('Nem adható meg üres vagy 0 érték!');
     return;
  }
  try {
    await this.web.createItem(this.Item);
    this.loadItems()
    this.Item = {
      id:null,
      alt: '',
      ar: null,
      nev: '',
      path: '',
      tipus: ''
    }
  } catch (error) {
    console.error('Hiba történt a mentéskor:', error);
  }
}

filterText(event: KeyboardEvent): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]/g, '');

}
  updateItem(item: any): void {
    this.web.updateItem(item.id, item).subscribe({
      next: (response) => {
        console.log("Sikeres frissítés:", response);
      },
      error: (error) => {
        console.error("Hiba a frissítés során:", error);
      }
    });
  }
  deleteItem(id: string): void {
    this.web.deleteItem(id).subscribe(() => this.loadItems());
  }
  
  deleteComment(id: string):void {
    this.commentService.deleteAll(id).subscribe(() => {
      this.loadComments()
    })
  }
  getReports() {
    this.commentService.getData().subscribe(res => {
      this.reports = res
      console.log(this.reports);
    });
  }
  deleteReport(comment:any,reportId: string): void {
    const reportIndex = comment.reports.findIndex((report: any) => report.id === reportId);
    if (reportIndex !== -1) {
      comment.reports.splice(reportIndex, 1); 
    }
    this.commentService.deleteReport(reportId).subscribe(()=> {
      this.getReports()
    })
}
}