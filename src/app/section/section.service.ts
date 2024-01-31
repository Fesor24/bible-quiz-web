import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IApiResponse } from '../shared/models/api-response';
import { map } from 'rxjs';
import { IQuestion, IQuestionScripture, ISaveQuestion } from '../shared/models/question';
import { environment } from '../environments/environment';
import { QuestionSource } from '../shared/enums/question-source.enum';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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

  getQuestions(source: QuestionSource){
    return this.http.get<IQuestion[]>(this.baseUrl + `questions?source=${source}`);
  }

  getQuestionPassage(questionId: number){
    return this.http.get<IQuestionScripture>(this.baseUrl + `question/passage/${questionId}`);
  }
}
