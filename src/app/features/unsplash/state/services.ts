import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class UnsplashService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.unsplash.com';
  private ACCESS_KEY = 'HfS6VON2Xod6qiCsWaYwt5DgMrKBUxHmaxcLPlSu2ZI';

  searchForPhotos(): Observable<any[]> {
    const result = this.http.get<any[]>(`${this.apiUrl}/search/photos?query=sky`, {
      headers: {
        Authorization: `Client-ID ${this.ACCESS_KEY}`,
      },
    });

    return result;
  }

  getOnePhoto(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/photo/${id}`);
  }

  getOnePhotoDetail(id: number) {
    return this.http.get<any>(`${this.apiUrl}/photo/${id}/detail`);
  }

  createOnePhoto(prod: Partial<any>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/photo`, prod);
  }

  updateOnePhoto(id: string, changes: Partial<any>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/photo/${id}`, changes);
  }

  deleteOnePhoto(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.apiUrl}/photo/${id}`);
  }
}
