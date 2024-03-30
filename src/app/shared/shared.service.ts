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
  private clockTick!: HTMLAudioElement;
  private wrong!: HTMLAudioElement;
  private correct!: HTMLAudioElement;

  constructor(private http: HttpClient) {
    this.clockTick = new Audio();
    this.wrong = new Audio();
    this.correct = new Audio();

    this.wrong.src = '../../assets/sounds/wrong.mp3';
    this.clockTick.src = '../../assets/sounds/ticking-clock.mp3';
    this.correct.src = '../../assets/sounds/congrats.mp3';

  }

  getScriptures(payload: any){
    return this.http.post<IApiResponse<IScriptureSearchResult, object, object>>(this.baseUrl + 'scriptures', payload, {observe: 'response'}).pipe(
      map((response) => response.body)

    );
  }

  startTickingClock(){
    this.clockTick.play();
  }

  playWrongEffect(){
    this.wrong.play();
  }

  playCorrectEffect(){
    this.correct.play();
  }

  stopTickingClock(){
    this.clockTick.pause();
    this.clockTick.currentTime = 0;
  }

  stopWrongEffect(){
    this.wrong.pause();
    this.wrong.currentTime = 0;
  }

  stopCorrectEffect(){
    this.correct.pause();
    this.correct.currentTime = 0;
  }


}
