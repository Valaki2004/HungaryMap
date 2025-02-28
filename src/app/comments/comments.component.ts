import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { CommentService } from '../comment.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comments',
  standalone: false,
  
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
    comments : string[] = []
    commentsString = {id:null,Helysegnev:'',Commnet:'',Email:''}
    user:any


    constructor (private commentsservice:CommentService, private route:ActivatedRoute, private auth :AuthService) {}
     ngOnInit( ) {
       this.commentsservice.getComments().subscribe((res)=>{
        this.comments = res ? Object.values(res): []
        this.route.paramMap.subscribe(params => {
          this.commentsString.Helysegnev = params.get('helysegnev') || '';
        });
        this.route.queryParams.subscribe(params => {
          this.commentsString.Email = params['email'] || '';
        })
        this.commentsservice.getComments().subscribe((res) => {
          this.comments = res ? Object.values(res) : [];
        });
        this.auth.getCurrentUser().subscribe(user => {
          this.user = user
        })
        
     })
     
    }
    PostComment() {
      if (this.commentsString.Commnet.trim()) {
        this.commentsservice.createComment(this.commentsString).subscribe(() => {
          this.comments.push(Object.assign({},  this.commentsString.Email && this.commentsString.Helysegnev && this.commentsString.Commnet));
          this.commentsString.Commnet = '';
        });
      } else {
        console.warn('A hozzászólás mező nem lehet üres!');
      }
    }
}