import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  standalone: false
})
export class CommentsComponent implements OnInit {
  comments: any[] = [];
  commentData = { id: null, Helysegnev: '', Comment: '', Email: '', displayName: '' };
  user: any;
  currentHelysegnev: string = '';
  currentPage: number = 1; 
  totalPages: number = 1;  
  commentsPerPage: number = 10;  
  moderator: any = null;
  admin: any = null; 

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private auth: AuthService,
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
        this.loadUserComments(user.email);
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
    const newComment = {
      ...this.commentData,
      createdAt: new Date().toISOString(),
    };

    this.commentService.createComment(newComment).subscribe(() => {
      this.loadComments();
    });
  }

  
  deleteComment(id: string): void {
    this.commentService.deleteComment(id).subscribe(() => {
      this.loadComments();
    });
  }


  loadComments(): void {
    this.commentService.getComments().subscribe(
      (data: any) => {
    
        const filteredComments = Object.keys(data).map(key => {
          const comment = { id: key, ...data[key] };
          if (comment.Helysegnev === this.currentHelysegnev) {
            return comment;
          }
        }).filter(Boolean);


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


  loadUserComments(email: string): void {
    this.commentService['getCommentsByUser'](email).subscribe(
      (userComments: any[]) => {
        console.log('Felhasználó kommentjei:', userComments);
      },
      (error: any) => { 
        console.error('Hiba a felhasználó kommentjeinek lekérésekor:', error);
      }
    );
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadComments();
    }
  }
  signinnavigte(){
    this.router.navigate( ['/login']);
  }
}