import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../shared/models/api-response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  baseUrl = ' https://localhost:7230/';

  constructor(private http: HttpClient) {}

  getFesorQuestions() {
    return this.http.get<IApiResponse>(this.baseUrl + '/fesorQuestions', {observe:'response'})
    .pipe(
      map(response => {
        return response.body
      })
    );
  }

  getThousandQuestions(){
    return this.http.get<IApiResponse>(this.baseUrl + '/thousandQuestions');
  }

  getRevisionQuestions(){
    return this.http.get<IApiResponse>(this.baseUrl + '/revisionQuestions');
  }
}
