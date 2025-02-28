import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-comments',
  standalone: false,
  
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
    comments : string[] = []
    commentsString = {id:null,Helysegnev:'',Commnet:'',Email:''}

    constructor (private base:BaseService) {}

     ngOnInit( ) {
       this.base.getComments().subscribe((res)=>{
        this.comments = Object.values(res)  
     })
    }
     PostComment(){
      this.base.createComment(this.comments)
     }
}


