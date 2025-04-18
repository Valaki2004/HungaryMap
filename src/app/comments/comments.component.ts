import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  standalone: false
})
export class CommentsComponent implements OnInit {
  @Input() comments: any[] = [];
  commentData = { id: null, Helysegnev: '', Comment: '', Email: '', displayName: '' };
  replyData = { id: null, Helysegnev: '', Reply: '', Email: '', displayName: '' };
  user: any;
  currentHelysegnev: string = '';
  currentComment: string = '';
  currentPage: number = 1; 
  totalPages: number = 1;  
  commentsPerPage: number = 10;  
  moderator: any = null;
  admin: any = null; 

  currentReportComment: any = null;
  currentReportReason: string = '';
  currentOtherReason: string = '';
  showReportModal: boolean = false;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private base: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentHelysegnev = params.get('helysegnev') || 'Csevegő';
      this.commentData.Helysegnev = this.currentHelysegnev;
      this.loadComments();
    });
    this.auth.getCurrentUser().subscribe(user => {
      this.user = user;
      if (user) {
        this.commentData.Email = user.email || '';  
        this.commentData.displayName = user.displayName || 'Névtelen'; 
      }
    });
    this.auth.getIsModerator().subscribe(moderator => {
      this.moderator = moderator;
    });
    this.auth.getIsAdmin().subscribe(admin => {
      this.admin = admin;
    });
  }

  postComment(): void {
    if (!this.commentData.Comment || this.commentData.Comment.trim() === '') {
      console.error();
      ('A hozzászólás nem lehet üres!');
      return;
    }
  
    const newComment = {
      ...this.commentData,
      createdAt: new Date().toISOString(),
    };
  
    this.commentService.createComment(newComment).subscribe(() => {
      this.loadComments();
      this.commentData.Comment = '';
    });
  }

  deleteComment(id: string): void {
    this.commentService.deleteComments(id).subscribe(() => {
      this.loadComments();
    });
  }

  loadComments(): void {
    this.commentService.getCommentsWithReplies().subscribe(
      (comments: any) => {
        if (!comments || comments.length === 0) {
          console.log('Nincsenek kommentek.');
          return;
        }
        const filteredComments = comments.filter((comment: { Helysegnev: string; }) => comment.Helysegnev === this.currentHelysegnev);
        const startIndex = (this.currentPage - 1) * this.commentsPerPage;
        const endIndex = startIndex + this.commentsPerPage;
        this.comments = filteredComments.slice(startIndex, endIndex);
        this.totalPages = Math.ceil(filteredComments.length / this.commentsPerPage);
      },
      error => {
        console.error('Hiba a kommentek betöltésekor:', error);
      }
    );
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadComments();
    }
  }

  signinnavigte(): void {
    this.router.navigate(['/login']);
  }

  postReply(parentId: string): void {
    const newReply = {
      ...this.replyData,
      parentId: parentId,
      createdAt: new Date().toISOString(),
    };
    this.commentService.createReply(newReply).subscribe(() => {
      this.loadComments();
    });
  }

  toggleReply(commentId: string): void {
    this.currentComment = this.currentComment === commentId ? '' : commentId;
  }

  openReportModal(comment: any) {
    this.currentReportComment = comment;
    this.showReportModal = true;
  }

  toggleReportModal(): void {
    this.showReportModal = !this.showReportModal;
  }

  submitReport(): void {
    if (!this.currentReportReason) {
      alert('Kérlek válassz egy riportálási okot!');
      return;
    }

    const report = {
      commentId: this.currentReportComment.id,
      commentText: this.currentReportComment.Comment,
      reporterUserId: this.user?.uid,
      email: this.user?.email,
      reporterName: this.user?.displayName || this.user?.email,
      reportReason: this.currentReportReason,
      otherReason: this.currentOtherReason || 'Nincs',
      timestamp:  new Date().toISOString(),
    };

    this.commentService.addData('reports', report).then(() => {
      this.closeReportModal();
    }).catch((error) => {
      console.error('Riport mentési hiba:', error);
    });
  }

  closeReportModal(): void {
    this.showReportModal = false;
    this.currentReportComment = null;
    this.currentReportReason = '';
    this.currentOtherReason = '';
  }

  reportComment(comment: any): void {
    this.currentReportComment = comment;
    this.openReportModal(comment);
  }
}