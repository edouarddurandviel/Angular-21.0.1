import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class UnsplashService {
  private http = inject(HttpClient);
  private unsplashUrl = environment.unsplashUrl;
  private ACCESS_KEY = environment.accessKey;

  searchForPhotos(color: string): Observable<any[]> {
    const result = this.http.get<any[]>(
      `${this.unsplashUrl}/search/photos?query=sky&color=${color}&content_filter=high`,
      {
        headers: {
          Authorization: `Client-ID ${this.ACCESS_KEY}`,
        },
      },
    );

    return result;
  }

  getOnePhoto(id: string): Observable<any> {
    return this.http.get<any>(`${this.unsplashUrl}/photo/${id}`);
  }

  getOnePhotoDetail(id: number) {
    return this.http.get<any>(`${this.unsplashUrl}/photo/${id}/detail`);
  }

  createOnePhoto(prod: Partial<any>): Observable<any> {
    return this.http.post<any>(`${this.unsplashUrl}/photo`, prod);
  }

  updateOnePhoto(id: string, changes: Partial<any>): Observable<any> {
    return this.http.put<any>(`${this.unsplashUrl}/photo/${id}`, changes);
  }

  deleteOnePhoto(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.unsplashUrl}/photo/${id}`);
  }
}
