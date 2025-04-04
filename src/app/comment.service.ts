import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private CommentURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/comments";
  private replyURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/comments/reply";
  private reportURL = "https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/comments/reports";
  currentReportReason: any;
  currentOtherReason: any;
  commentService: any;

  constructor(private http: HttpClient,private auth:AuthService,private db:AngularFireDatabase,private afs: AngularFirestore) { }
  getCommentsWithReplies(): Observable<any> {
    return this.http.get(`${this.CommentURL}/.json`).pipe(
      switchMap((commentsData: any) => {
        if (!commentsData) return of([]);
        const comments = Object.keys(commentsData).map(key => ({
          id: key,
          ...commentsData[key],
          replies: []
        }));
        return this.http.get(`${this.replyURL}/.json`).pipe(
          map((repliesData: any) => {
            if (repliesData) {
              Object.keys(repliesData).forEach(replyId => {
                const reply = repliesData[replyId];
                const parentId = reply.parentId;
                const comment = comments.find(c => c.id === parentId);
                if (comment) {
                  comment.replies.push({
                    id: replyId,
                    ...reply
                  });
                }
              });
            }
            return comments;
          })
        );
      })
    );
  }
  getReportsWithComments(): Observable<any> {
    return this.http.get(`${this.CommentURL}/.json`).pipe(
      switchMap((commentsData: any) => {
        if (!commentsData) return of([]);
  
        const comments = Object.keys(commentsData).map(key => ({
          id: key,
          ...commentsData[key],
          reports: []
        }));
        return this.http.get(`${this.reportURL}/.json`).pipe(
          map((reportsData: any) => {
            if (reportsData) {
              Object.keys(reportsData).forEach(reportsId => {
                const report = reportsData[reportsId];
                const commentId = report.commentId;
                const commentFind = comments.find(c => c.id === commentId);
                if (commentFind) {
                  commentFind.reports.push({
                    id: reportsId,
                    ...report,
                    comment: {
                      id: commentFind.id,
                      text: commentFind.text 
                    }
                  });
                }
              });
            }
            return comments;
          })
        );
      })
    );
  }
  getComments(){
   return this.http.get(`${this.CommentURL}/.json`)
  }
  createComment(comment: { Helysegnev: string; Comment: string; Email: string; displayName: string }): Observable<any> {
    return this.http.post(`${this.CommentURL}/.json`, comment);
  }
  deleteComments(id: string): Observable<any> {
    return this.http.get(`${this.replyURL}/.json`).pipe(
      switchMap((repliesData: any) => {
        if (!repliesData) {
          return this.http.delete(`${this.CommentURL}/${id}.json`);
        }
        const repliesToDelete = Object.keys(repliesData)
          .filter(replyId => repliesData[replyId].parentId === id)
          .map(replyId => `${this.replyURL}/${replyId}.json`);
        const deleteRepliesRequests = repliesToDelete.map(replyUrl => this.http.delete(replyUrl));
        const deleteCommentRequest = this.http.delete(`${this.CommentURL}/${id}.json`);
        return forkJoin([...deleteRepliesRequests, deleteCommentRequest]);
      })
    );
  }
  
  createReply(reply: { parentId: string; Reply: string; Email: string; displayName: string }): Observable<any> {
    return this.http.post(`${this.replyURL}/.json`, reply);
  }
  reportComment(comment: any) {
    this.auth.getCurrentUser().subscribe((user: any) => {    
      const report = {
        commentId: comment.id,
        commentText: comment.text,
        reporterUserId: user.uid,
        reporterName: user.displayName,
        reporterEmail: user.email ,
        timestamp: Date.now(),
      };
      this.addData('reports', report).then(() => {
        alert('Komment jelentve!');
      });
    });
  }
  addData(path: string, data: any): Promise<any> {
    return this.http.post(`${this.reportURL}/.json`, data).toPromise();
  }
  getData(): Observable<any> {
    return this.http.get(`${this.reportURL}/.json`)
  }
  updateData(path: string, data: any): Promise<void> {
    return this.db.object(path).update(data);
  }
  deleteData(id:string){
    return this.http.delete(`${this.reportURL}/${id}.json`);
  }
  deleteCommentData(commentId:string){
    return this.http.delete(`${this.CommentURL}/${commentId}.json`);
  }
  submitReport(comment: any) {
    if (!this.currentReportReason) {
      alert('Kérlek válaszd ki a jelentés okát!');
      return;
    }
    if (this.currentReportReason === 'other' && !this.currentOtherReason) {
      alert('Kérlek írd le az indokot, hogy miért jelentettél!');
      return;
    }

    const reportData = {
      ...comment,
      reportReason: this.currentReportReason,
      otherReason: this.currentOtherReason || ''
    };

    this.commentService.reportComment(reportData).then(() => {
      alert('A komment sikeresen jelentve lett!');
    }).catch((error: any) => {
      console.error(error);
    });
  } 
  getReports() {
    return this.afs.collection('reports').valueChanges(); 
  }
    getCommentsByUser(email: string): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(`${this.CommentURL}/.json`).pipe(
      map(res => {
        if (!res) return []; 
        return Object.keys(res)
          .map(key => ({ id: key, ...res[key] }))
          .filter(comment => comment.Email === email);  
      })
    );
  }
  getReplyByUser(email: string): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(`${this.replyURL}/.json`).pipe(
      map(res => {
        if (!res) return []; 
        return Object.keys(res)
          .map(key => ({ id: key, ...res[key] }))
          .filter(comment => comment.Email === email);  
      })
    );
  }
}

