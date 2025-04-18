import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser: any;
  private userSub = new BehaviorSubject<any>(null);
  private adminSub = new BehaviorSubject<boolean>(false);
  private moderatorSub = new BehaviorSubject<boolean>(false);
  private loggedUserSub = new BehaviorSubject<boolean>(false);
  public loggedUserSubject = new BehaviorSubject<firebase.User | null>(null);
  private profileURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/Profile"
  private apiUrl="http://127.0.0.1:5001/magyarorszagmap/us-central1/api/"

  constructor(private afAuth: AngularFireAuth, private router: Router, private http:HttpClient) {
        this.afAuth.authState.subscribe(
          (user:any)=>{
            if (user){
              this.loggedUser=user?._delegate
              console.log("User", user)
              user.getIdToken().then(
                (token: any) => {
                  this.loggedUser.accessToken = token
                  const headers = new HttpHeaders().set('Authorization', token)
                  this.http.get(this.apiUrl + "getClaims/" + user.uid, { headers }).subscribe(
                    {
                      next: (claims) => {
                        console.log("Claims", claims)
                        this.loggedUser.claims = claims
                        this.userSub.next(this.loggedUser)
                        this.adminSub.next(this.loggedUser.claims.admin)
                        this.loggedUserSub.next(true)
                        this.userSub.next(this.loggedUser)
                        this.moderatorSub.next(this.loggedUser.claims.moderator)
                        this.loggedUserSub.next(true)
                        console.log("User: ", this.loggedUser)
                      },
                      error: (error) => {
                        console.log(error)
                        this.loggedUser = null
                        this.userSub.next(null)
                        this.adminSub.next(false)
                        this.moderatorSub.next(false)
                        this.loggedUserSub.next(false)
                      }
                    }
                  )
              })
              .catch(
              (error:any)=>console.error(error)
              )
            }
            else {
              this.loggedUser=null
              this.userSub.next(null)
              this.adminSub.next(false)
              this.moderatorSub.next(false)
              this.loggedUserSub.next(false)
            }
          }
        )
    
    this.afAuth.authState.subscribe(user => {
      this.loggedUserSubject.next(user);
    });
  }
  getUsers() {
    if (this.loggedUser.accessToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        this.loggedUser.accessToken
      );
      return this.http.get(this.apiUrl + 'users', { headers });
    }
    return null;
  }
  setUserClaims(uid: any, claims: any) {
    if (this.loggedUser.accessToken) {
      let body = {
        claims: claims,
        uid: uid,
      };
      const headers = new HttpHeaders().set(
        'Authorization',
        this.loggedUser.accessToken
      );
      return this.http.post(this.apiUrl + 'setCustomClaims', body, { headers });
    }
    return null;
  }
  getUserData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.http.get(`${this.profileURL}/${user.uid}/additionalData/.json`).toPromise()
            .then(data => {
              console.log("Felhasználói adatok lekérve:", data);
              resolve(data);
            })
            .catch(error => {
              console.error("Hiba történt a GET kérésnél:", error);
              reject(error);
            });
        } else {
          reject(new Error("Felhasználó nincs bejelentkezve"));
        }
      });
    });
  }
  getUserEmailAndDisplayName(){
    return this.http.get(`${this.profileURL}/${this.loggedUser.uid}/.json`)
  }
  addAdditionalUserData(additionalData: any): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        return this.http.patch(`${this.profileURL}/${user.uid}.json`, { additionalData }).toPromise()
          .then(() => {
            console.log(additionalData);
          });
      }
      throw new Error("Felhasználó nincs bejelentkezve")
    }).catch(error => {
      console.error("Hiba történt az adatok hozzáadásakor:", error);
      throw error;
    });
  }

  register(email: string, password: string, displayName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        if (!cred.user) {
          throw new Error('Felhasználó nem található.')
        }
        return cred.user.updateProfile({ displayName: displayName }).then(() => {
          const userData = {
            uid: cred.user!.uid,
            email: cred.user!.email,
            displayName: displayName
          };
          return this.http.post(`${this.profileURL}/${cred.user!.uid}.json`, userData).toPromise()
        }).then(() => {
          this.loggedUserSubject.next(cred.user!)
          return cred.user!.sendEmailVerification()
        }).then(() => this.logout())
          .then(() => this.router.navigate(['login']))
      })
      .catch(error => {
        console.error("Regisztrációs hiba:", error)
        throw error
      });
  }
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(cred => {
        if (cred.user) {
          this.loggedUserSubject.next(cred.user);
          return { success: true };
        }
        return { success: false, message: 'Az email cím jelszó páros nem megfelelő' };
      })
      .catch(err => {
        console.error("Bejelentkezési hiba:", err.message);
        if (err.code === 'auth/user-not-found') {
          return { success: false, message: 'Nincs ilyen felhasználó regisztrálva ezzel az e-mail címmel.' };
        } else if (err.code === 'auth/wrong-password') {
          return { success: false, message: 'Hibás jelszó. Próbáld újra!' };
        } else {
          return { success: false, message: 'Az email cím jelszó páros nem megfelelő' };
        }
      });
  }
  

  loginWithGoogle(): Promise<void> {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(cred => {
      if (cred.user) {
        this.loggedUserSubject.next(cred.user);
      }
    }).catch(error => {
      console.error("Google bejelentkezési hiba:", error);
      throw error;
    });
  }
  loginWithFacebook(): Promise<void> {
    return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(cred => {
      if (cred.user) {
        this.loggedUserSubject.next(cred.user);
      }
    }).catch(error => {
      console.error("Google bejelentkezési hiba:", error);
      throw error;
    });
  }
  loginWithGithub(): Promise<void> {
    return this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(cred => {
      if (cred.user) {
        this.loggedUserSubject.next(cred.user);
      }
    }).catch(error => {
      console.error("Google bejelentkezési hiba:", error);
      throw error;
    });
  }
  

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.loggedUserSubject.next(null);
      this.router.navigate(['/map']);
    });
  }
  isLoggedIn(): boolean {
    return !!this.afAuth.currentUser;
  } 
  getIsAdmin(){
    return this.adminSub
  }
  getIsModerator(){
    return this.moderatorSub
  }
  getIsLoggedUser() {
    return this.loggedUserSub;
  }
  getLoggedUser() {
    return this.userSub;
  }
  getCurrentUser(): Observable<any> {
    return this.loggedUserSubject.asObservable().pipe(
      map(user => user ? { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName || 'Névtelen' 
      } : null)
    );
  }
  getCurrentUserState() {
    return this.afAuth.authState;
  }


  forgotPassword(email: any) {
    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => console.log('mail elküldve!'));
  }
}