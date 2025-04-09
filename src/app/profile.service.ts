import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/Profile"

  private apiUrl="http://127.0.0.1:5001/magyarorszagmap/us-central1/api/"

  constructor(private http:HttpClient,private auth:AuthService,private afAuth:AngularFireAuth) { }

  getProfileData(uid:string){
    return this.http.get(`${this.profileURL}/${uid}/additionalData/.json`)
  }
  
  // createProfileData(uid: string, profil: any) {
  //   console.log("Mentés Firebase-be:", profil);
  //   return this.http.put(`${this.profileURL}/users/${uid}.json`, profil).toPromise();
  // }
  

  // updateProfileData(profile:any){
  //   return this.http.patch(`${this.profileURL}/${profile.id}.json`,profile)
  // }

  // updateUserProfile(profileData: { displayName?: string }): Promise<void> {
  //   return this.afAuth.currentUser.then(user => {
  //     if (user) {
  //       return user.updateProfile({ displayName: profileData.displayName ?? null }).then(() => {
  //         this.auth.loggedUserSubject.next({ ...user, displayName: profileData.displayName ?? null });
  //       });
  //     } else {
  //       return Promise.reject('Nincs bejelentkezett felhasználó.');
  //     }
  //   }).catch(error => {
  //     console.error("Profil frissítési hiba:", error);
  //     throw error;
  //   });
  // }
  // updateUser(displayName: any, email: any,profile:any) {
  //   if (this.auth.loggedUser.accessToken) {   
  //     let body = { displayName, email,profile };
  //     const headers = new HttpHeaders().set(
  //       'Authorization',
  //       this.auth.loggedUser.accessToken
  //     );
  //     return this.http.patch(this.apiUrl + 'updateUser/', body, { headers });
  //   }
  //     return null;
  //   }
}
