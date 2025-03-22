import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://your-api-url/comments'; 

  constructor(private http: HttpClient) {}

  getComments(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createComment(comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, comment);
  }
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${commentId}`);
  }
  getCommentsByUser(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getByUser/${email}`);
  }

  addNewTopic(topic: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addTopic`, topic);
  }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post('/api/upload', formData);
  }
  
}
