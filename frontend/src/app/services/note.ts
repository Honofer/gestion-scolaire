import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:8080/api/v1/notes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const user = this.authService.currentUserValue;
    return new HttpHeaders({
      'Authorization': `Bearer ${user.token}`
    });
  }

  create(note: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, note, { headers: this.getHeaders() });
  }

  getMoyenne(eleveId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/eleve/${eleveId}/moyenne`, { headers: this.getHeaders() });
  }
}
