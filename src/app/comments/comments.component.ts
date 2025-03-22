import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { ActivatedRoute } from '@angular/router';
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
  newTopicTitle: string = '';
  newTopicContent: string = '';
  selectedCategory: any;
  categories: any = ['Kategória 1', 'Kategória 2', 'Kategória 3'];
  searchTerm: any = '';
  selectedTopic: any;
  newCommentData: any = { Comment: '', file: null };
  newTopicCategory: any;
  topics: any[] = [];

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private auth: AuthService
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
  }

  postComment(): void {
    if (this.newCommentData.Comment.trim()) {
      const newComment = {
        ...this.newCommentData,
        createdAt: new Date().toISOString(),
      };

      if (this.newCommentData.file) {
        const formData = new FormData();
        formData.append('file', this.newCommentData.file, this.newCommentData.file.name);
      
        this.commentService.uploadFile(formData).subscribe((fileUrl: string) => {
          newComment['fileUrl'] = fileUrl;
          this.commentService.createComment(newComment).subscribe(() => {
            this.loadComments();
            this.newCommentData.Comment = '';
            this.newCommentData.file = null;
          });
        });
      } else {
        this.commentService.createComment(newComment).subscribe(() => {
          this.loadComments();
          this.newCommentData.Comment = '';
        });
      }
    }
  }

  deleteComment(postId: string, commentEmail: string): void {
    if (postId) {
      if (this.user && (this.user.email === commentEmail || this.isModeratorOrAdmin())) {  
        this.commentService.deleteComment(postId).subscribe(
          () => {
            this.loadComments();
          },
          error => {
            console.error('Hiba a komment törlésénél:', error);
          }
        );
      }
    } else {
      console.error('Nincs megadva komment ID');
    }
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
        const searchFiltered = filteredComments.filter(comment => comment.Comment.toLowerCase().includes(this.searchTerm.toLowerCase()));
        const categoryFiltered = searchFiltered.filter(comment => this.selectedCategory === 'all' || comment.category === this.selectedCategory);

        const startIndex = (this.currentPage - 1) * this.commentsPerPage;
        const endIndex = startIndex + this.commentsPerPage;
        this.comments = categoryFiltered.slice(startIndex, endIndex);
        this.totalPages = Math.ceil(categoryFiltered.length / this.commentsPerPage);
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

  isModeratorOrAdmin(): boolean {
    return this.user && (this.user.role === 'moderator' || this.user.role === 'admin');
  }

  isUserOrHigher(): boolean {
    return this.user && (this.user.role === 'user' || this.user.role === 'moderator' || this.user.role === 'admin');
  }

  addNewTopic(): void {
    if (this.newTopicTitle.trim() && this.newTopicContent.trim()) {
      const newTopic = {
        title: this.newTopicTitle,
        content: this.newTopicContent,
        category: this.newTopicCategory,
        createdAt: new Date().toISOString(),
        createdBy: this.user.displayName || 'Névtelen',
      };

      this.commentService.addNewTopic(newTopic).subscribe(() => {
        this.newTopicTitle = '';
        this.newTopicContent = '';
        this.loadComments();  
      });
    } else {
      console.log('Téma címének és tartalmának megadása kötelező!');
    }
  }

  replyToComment(commentId: string): void {
    this.commentData.Comment = `@${commentId} `;
  }

  filteredTopics(): any[] {
    return this.topics.filter(topic => {
      return (
        (this.selectedCategory === 'all' || topic.category === this.selectedCategory) &&
        (topic.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    });
  }
  openTopic(id: any): void {
    console.log('Opening topic with ID:', id);
  }

  toggleDarkMode(): void {
    console.log('Toggling dark mode');
  }

  voteComment(commentId: any, type: string): void {
    console.log('Voting on comment:', commentId, 'Type:', type);
  }

  onFileChange($event: Event): void {
    console.log('File changed:', $event);
  }
}
