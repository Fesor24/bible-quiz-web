import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IApiResponse } from './models/api-response';
import { catchError, map } from 'rxjs';
import { IScriptureSearchResult } from './models/bible-scripture-search';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getScriptures(payload: any){
    return this.http.post<IApiResponse<IScriptureSearchResult, object, object>>(this.baseUrl + 'scriptures', payload, {observe: 'response'}).pipe(
      map((response) => response.body)

    );
  }
}
