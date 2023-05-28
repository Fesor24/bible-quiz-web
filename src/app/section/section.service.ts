import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IApiResponse } from '../shared/models/api-response';
import { map } from 'rxjs';
import { IQuestion, ISaveQuestion } from '../shared/models/question';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SectionService implements OnInit {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getThousandQuestions(token: string) {

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`)

    return this.http.get<IApiResponse>(this.baseUrl + "thousand-questions/fetch", {observe: 'response', headers})
    .pipe(
      map(response=>
          response.body
    ))
  }

  getFesorQuestions(token: string){

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`)

    return this.http.get<IApiResponse>(this.baseUrl + "fesor-questions/fetch", {observe: 'response', headers})
    .pipe(
      map(response =>
        response.body)
    )
  }

  getSavedQuestions(token: string){

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`)

    return this.http
      .get<IApiResponse>(this.baseUrl + 'revision-questions/fetch', {
        observe: 'response',
        headers
      })
      .pipe(map((response) => response.body));
  }

  addSavedQuestions(value: ISaveQuestion, token:string){

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post<IApiResponse>(this.baseUrl + 'revision-question/add', value, {headers}).pipe(
      map((response: IApiResponse) => response)
    )
  }

  removeSavedQuestions(){

    const token = localStorage.getItem('token');

    let headers = new HttpHeaders;

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.delete<IApiResponse>(this.baseUrl + 'revision-question/delete', {headers}).pipe(
      map((response: IApiResponse) => {
        return response;
      })
    )
  }
}
