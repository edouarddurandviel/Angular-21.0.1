import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Photo {
  id: string;
  url: string;
  name: string;
}

interface PhotoDetail extends Photo {
  thumbnail: string[];
}

@Injectable({ providedIn: 'root' })
export class UnsplashService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.unsplash.com';
  private YOUR_ACCESS_KEY = 'HfS6VON2Xod6qiCsWaYwt5DgMrKBUxHmaxcLPlSu2ZI';

  searchForPhotos(): Observable<Photo[]> {
    const result = this.http.get<Photo[]>('https://api.unsplash.com/search/photos?query=sky', {
      headers: {
        Authorization: `Client-ID ${this.YOUR_ACCESS_KEY}`,
      },
    });

    return result;
  }

  getOnePhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/photo/${id}`);
  }

  getOnePhotoDetail(id: number) {
    return this.http.get<PhotoDetail>(`${this.apiUrl}/photo/${id}/detail`);
  }

  createOnePhoto(prod: Partial<Photo>): Observable<Photo> {
    return this.http.post<Photo>(`${this.apiUrl}/photo`, prod);
  }

  updateOnePhoto(id: string, changes: Partial<Photo>): Observable<Photo> {
    return this.http.put<Photo>(`${this.apiUrl}/photo/${id}`, changes);
  }

  deleteOnePhoto(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.apiUrl}/photo/${id}`);
  }
}
