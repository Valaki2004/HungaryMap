import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser : any
  private loggedUserSubject = new BehaviorSubject<boolean>(false)
    constructor(private afAuth: AngularFireAuth) {}
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
      return this.afAuth.signOut();
    }
    getCurrentUser() {
      return this.afAuth.authState;
    }
    loginWithGoogle() {
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
}
