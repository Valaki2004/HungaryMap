import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CardService } from '../card.service';
import { CommentService } from '../comment.service';


@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  Profile:any = {}
  profileData= {
    Email: '',
    Surname: '',
    GivenName: '',
    BirthPlace:'',
    MotherBirthPlace:'',
    MotherMaidenName:'',
    Address:'',
    PhoneNumber:''
  }
  loggedUser: any = null;
  editMode = false;
  editedDisplayName = '';
  editedEmail = '';
  comments: any[] = [];
  reply:any[]=[];
  orders: any[] = [];
  selectedOrder: any = null; 
  user: any;
  currentPage = 1;
  commentsPerPage = 5;
  repliesPerPage = 5;
  uid:any

  constructor(
    private auth: AuthService,
    private cardService: CardService,
    private commentservice:CommentService
  ) {}
  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.auth.getUserData().then(data => {
        this.profileData = { ...data }; })
        this.auth.getUserEmailAndDisplayName().subscribe(res=> {
          console.log("Felhasználó email és diplayname:",res)
          this.Profile = res
        })
        this.loggedUser = user;
        this.editedDisplayName = user.displayName || '';
        this.loadUserComments(user.email);
        this.loadOrders(user.email);
        this.profileData.Email = this.loggedUser.email;
      }
    });
  }
  saveProfile(): void {
    this.auth.addAdditionalUserData(this.profileData).then(() => {
      console.log("A profil sikeresen frissítve.",this.profileData);
    }).catch(error => {
      console.error("Hiba történt a profil frissítésekor:", error);
    });
    this.editMode = false
  }


  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  loadUserComments(email: string): void {
    this.commentservice.getCommentsByUser(email).subscribe(
      (userComments: any[]) => {
        this.comments = userComments;
      },
    );
  }
  loadOrders(email: string): void {
    this.cardService.getOrdersByUser(email).subscribe(
      (orders: any[]) => {
        this.orders = orders || [];
      },
    );
  }

  calculateTotalPrice(cart: any[]): number {
    return cart?.reduce((total, item) => total + (item.ar * item.db), 0);
  }
  
  openOrderDetails(order: any) {
    this.selectedOrder = order;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('orderDetailsModal')!);
    modal.show();
  }
  

  get paginatedComments() {
    const start = (this.currentPage - 1) * this.repliesPerPage;
    return this.reply.slice(start, start + this.repliesPerPage);
  }
  get paginatedReplies() {
    const start = (this.currentPage - 1) * this.commentsPerPage;
    return this.comments.slice(start, start + this.commentsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.commentsPerPage < this.comments.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}


