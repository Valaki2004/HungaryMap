import { Component, } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 word:string=''
  user:any;
  constructor(private authService: AuthService, public router:Router,private search:SearchService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user
    })
    this.search.getSearchWord().subscribe(
      (res)=>this.word=res)
  }
  logout() {
    this.authService.logout()
  }
  onKeyUp(event:any){
    console.log(event.target.value)
    this.search.setSearchWord(event.target.value)
  }
}
