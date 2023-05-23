import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IQuestion } from '../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  constructor() {}

  constTimerValue = 10;

  @Input() index = 0;

  timer = 10;

  intervalId: any;

  showAnswer = false;

  @Input() questions: IQuestion[] = [];

  @Input() isThousandQuestion: boolean = false;

  @Input() isFesorQuestion: boolean = false;

  @Input() isSavedQuestions: boolean = false;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  handleNext() {
    this.stopTimer();
    this.showAnswer = false;
    this.index++;
    this.timer = this.constTimerValue;
    this.startTimer();
  }

  handlePrevious() {
    if (this.index == 0) {
      this.index = 0;
    } else {
      this.index--;
    }
  }

  handleSave() {

    if(this.isFesorQuestion){
      localStorage.setItem('section_b_index', this.index.toString());
    }

    if (this.isSavedQuestions) {
      localStorage.setItem('saved_index', this.index.toString());
    }

    if (this.isThousandQuestion) {
      localStorage.setItem('section_a_index', this.index.toString());
    }

  }

  handleDisplayAnswer() {
    this.showAnswer = true;
    this.stopTimer();
  }

  setTimerValue(timer: number): string {
    if (timer < 10) {
      return `0${timer}`;
    } else {
      return `${timer}`;
    }
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.stopTimer();
        this.showAnswer = true;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }
}
