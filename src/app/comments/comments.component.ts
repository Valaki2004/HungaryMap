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

    constructor (private base:BaseService) {}

     ngOnInit( ) {
       this.base.getComments().subscribe((res)=>{
        this.comments = Object.values(res)  
        
     })
    }
}
