import { Component, OnInit, NgZone } from '@angular/core';
import { SectionService } from '../section.service';
import { IQuestion } from 'src/app/shared/models/question';

@Component({
  selector: 'app-biblequizzes-questions',
  templateUrl: './biblequizzes-questions.component.html',
  styleUrls: ['./biblequizzes-questions.component.css'],
})
export class BiblequizzesQuestionsComponent implements OnInit {
  thousandQuestions!: IQuestion[];

  constTimerValue = 10;

  index = 0;

  timer = 10;

  intervalId:any;

  showAnswer = false;

  constructor(private sectionService: SectionService, private ngZone: NgZone) {}
  ngOnInit(): void {
    this.getThousandQuestions();
    this.startTimer();
  }

  getThousandQuestions() {
    this.sectionService.getThousandQuestions().subscribe((response) => {
      if (response?.successful) {
        this.thousandQuestions = response.result as IQuestion[];
        console.log(response.result);
      } else {
        console.log('error', response?.errorMessage);
      }
    });
  }

  handleNext() {
    this.showAnswer=false;
    this.index++;
    this.timer = this.constTimerValue;
    this.startTimer()
  }

  handlePrevious() {

    if(this.index == 0){
      this.index = 0
    }
    else{
      this.index--;
    }

  }

  handleDisplayAnswer(){
    this.showAnswer = true;
    this.stopTimer();
  }

  startTimer(){
    this.ngZone.runOutsideAngular(() => {
      this.updateTimer();
    })
  }

  updateTimer(){
    this.ngZone.run(() => {
      this.timer--;
      if(this.timer > 0){
        this.intervalId = setTimeout(() => {
          console.log(this.timer)
          this.updateTimer();
        }, 1000)

      }
    })
  }

  stopTimer(){
    clearInterval(this.intervalId);
  }

}
