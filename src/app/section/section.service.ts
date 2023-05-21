import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IApiResponse } from '../shared/models/api-response';
import { map } from 'rxjs';
import { IQuestion } from '../shared/models/question';

@Injectable({
  providedIn: 'root',
})
export class SectionService implements OnInit {
  baseUrl = 'https://localhost:7230/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getThousandQuestions() {
    return this.http.get<IApiResponse>(this.baseUrl + "/thousand-questions/fetch", {observe: 'response'})
    .pipe(
      map(response=>
          response.body
    ))
  }
}
