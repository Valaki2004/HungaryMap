import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comments',
  standalone: false,
  
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
    comments : string[] = []
    commentsString = {id:null,Helysegnev:'',Commnet:'',Email:''}

    constructor (private commentsservice:CommentService) {}
     ngOnInit( ) {
       this.commentsservice.getComments().subscribe((res)=>{
        this.comments = Object.values(res)
     })
    }
     PostComment(){
      this.commentsservice.createComment(this.comments)
     }
}