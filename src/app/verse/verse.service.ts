import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs';
import { IApiResponse } from '../shared/models/api-response';
import { IVerse } from '../shared/models/verse';

@Injectable({
  providedIn: 'root'
})


export class VerseService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDailyVerse(){
    return this.http.get<IApiResponse<IVerse, object, object>>(this.baseUrl + 'verse').pipe(
      map((response: IApiResponse<IVerse, object, object>) => response)
    )
  }
}
