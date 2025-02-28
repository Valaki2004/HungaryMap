import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser : any
  private loggedUserSubject = new BehaviorSubject<boolean>(false)

    constructor(private afAuth: AngularFireAuth, private router: Router ) {
      this.afAuth.authState.subscribe((user)=> {
        if(user){
          this.loggedUserSubject.next(true)
        }
        else{
          this.loggedUserSubject.next(false)
        }
      })
    }
    register(email: string, password: string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    }
    login(email: string, password: string) {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }
    isloggedUser(){
      return this.loggedUserSubject
    }
    logout() {
      this.afAuth.signOut()
      this.router.navigate(['/map'])
    }
    getCurrentUser() {
      return this.afAuth.authState;
    }
    
    loginWithGoogle() {
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
}
