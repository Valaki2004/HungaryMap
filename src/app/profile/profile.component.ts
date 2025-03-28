import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { BaseService } from '../base.service';
import { CardService } from '../card.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  loggedUser: any = null;
  editMode = false;
  editedDisplayName = '';
  comments: any[] = [];
  reply:any[]=[];
  orders: any[] = [];
  selectedOrder: any = null; 
  user: any;
  currentPage = 1;
  commentsPerPage = 5;
  repliesPerPage = 5;

  constructor(
    private auth: AuthService,
    private cardService: CardService,
    private commentservice:CommentService
  ) {
    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.loggedUser = user;
        this.editedDisplayName = user.displayName || '';
        this.loadUserComments(user.email);
        this.loadUserRepies(user.email)
        this.loadOrders(user.email);
      }
    });
    this.auth.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    if (this.editedDisplayName.trim()) {
      this.auth.updateUserProfile({ displayName: this.editedDisplayName }).then(() => {
        if (this.loggedUser) {
          this.loggedUser.displayName = this.editedDisplayName;
        }
        this.editMode = false;
      }).catch(error => {
        alert('Hiba történt a profil mentésekor, próbáld újra!');
      });
    }
  }

  loadUserComments(email: string): void {
    this.commentservice.getCommentsByUser(email).subscribe(
      (userComments: any[]) => {
        this.comments = userComments;
      },
    );
  }
  loadUserRepies(email: string): void {
    this.commentservice.getReplyByUser(email).subscribe(
      (usereplies: any[]) => {
        this.reply = usereplies;
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
