import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IObjective } from 'src/app/shared/models/objective';
import { loadObjectives } from 'src/app/store/questions/questions.actions';
import { IQuestionStore } from 'src/app/store/questions/questions.reducer';
import { objectivesSelector } from 'src/app/store/questions/questions.selectors';

@Component({
  selector: 'app-objective-questions',
  templateUrl: './objective-questions.component.html',
  styles: []
})
export class ObjectiveQuestionsComponent implements OnInit, OnDestroy {
  questionSubscription!: Subscription;
  questions$!: Observable<IObjective[]>;
  showCongratsPage: boolean = false;
  index: number = 0;
  questions: IObjective[] = [];
  selectedOption!: string | undefined;
  answer!: string | undefined;
  intervalId: any;
  timer = 30;

  indexKey: string = 'obj_index';

  constructor(private store: Store<{ question: IQuestionStore }>) {
    this.questions$ = this.store.select(objectivesSelector);
    this.questionSubscription = this.questions$.subscribe({
      next: (data) => (this.questions = data),
      error: (err) => console.log(err),
    });
  }
  ngOnDestroy(): void {
    this.questionSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const resumeIndex = localStorage.getItem(this.indexKey);

    if (resumeIndex) {
      this.index = parseInt(resumeIndex);
    }
    this.store.dispatch(loadObjectives());
    this.startTimer();
  }

  handleNext() {
    this.stopTimer();
    if (this.index < this.questions.length) {
      this.answer = undefined;
      this.selectedOption = undefined;
      this.index++;
      localStorage.setItem(this.indexKey, this.index.toString());
      this.timer = 30;
      this.startTimer();
    } else {
      this.showCongratsPage = true;
    }
  }

  handlePrevious() {
    this.stopTimer();
    if (this.index === 0) {
      return;
    }
    this.index--;
    localStorage.setItem(this.indexKey, this.index.toString());
    this.answer = undefined;
    this.selectedOption = undefined;
    this.timer = 30;
    this.startTimer();
  }

  handleReset() {
    this.index = 0;
    this.selectedOption = undefined;
    this.answer = undefined;
  }

  setSelectedOption(option: string) {
    if(!this.answer){
      this.selectedOption = option;
    }

  }

  checkAnswer() {
    this.answer = this.questions[this.index].answer.toUpperCase();
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
        this.checkAnswer();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }
}
