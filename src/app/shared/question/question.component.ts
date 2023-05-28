import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef, DoCheck } from '@angular/core';
import { IQuestion, ISaveQuestion } from '../models/question';
import { ToastrService } from 'ngx-toastr';
import { SectionService } from 'src/app/section/section.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy, DoCheck {
  constructor(
    private toastr: ToastrService,
    private sectionService: SectionService,
    private changeRef: ChangeDetectorRef
  ) {}


  constTimerValue = 30;

  @Input() index = 0;

  timer = 10;

  isAvailable: boolean = false;

  intervalId: any;

  showAnswer = false;

  oldArrayLength = 0;

  showCongratsPage = false;

  @Input() questions: IQuestion[] = [];

  @Input() isThousandQuestion: boolean = false;

  @Input() isFesorQuestion: boolean = false;

  @Input() isSavedQuestions: boolean = false;

  ngOnInit(): void {
    this.startTimer();
    this.setIsAvailable();
  }

  ngDoCheck(): void {
    if(this.questions && this.questions.length !== this.oldArrayLength){
      this.oldArrayLength = this.questions.length;
      this.setIsAvailable();
      this.changeRef.detectChanges()
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }



  handleNext() {
    this.stopTimer();
    this.showAnswer = false;
    if((this.questions && this.questions.length - 1) == this.index){
      this.showCongratsPage = true
    }else{
      this.index++;
      this.timer = this.constTimerValue;
      this.startTimer();
    }
  }

  handlePrevious() {
    if (this.index == 0) {
      this.index = 0;
    } else {
      this.index--;
    }
  }

  handleSave() {
    if (this.isFesorQuestion) {
      localStorage.setItem('section_b_index', this.index.toString());
    }

    if (this.isSavedQuestions) {
      localStorage.setItem('saved_index', this.index.toString());
    }

    if (this.isThousandQuestion) {
      localStorage.setItem('section_a_index', this.index.toString());
    }

    this.toastr.success('Session saved');
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

  saveQuestionToDb(question: string, answer: string) {
    const data: ISaveQuestion = {
      question: question,
      answer: answer,
    };

    const token = localStorage.getItem('token');

    if (token) {
      this.sectionService
        .addSavedQuestions(data, token)
        .subscribe((response) => {
          if (response.successful) {
            console.log('Question saved');
          } else {
            console.log(response.errorMessage);
          }
        });
    }
  }

  removeSavedQuestions() {
    this.sectionService.removeSavedQuestions().subscribe((response) => {
      if(response.successful){
        this.toastr.success("Saved Questions Deleted")
        this.questions = [];
        this.setIsAvailable()
      }
      else{
        console.log(response.errorMessage)
      }
    })
  }

  setIsAvailable(){
    if(this.questions && this.questions.length > 0){
      this.isAvailable = true
    }
    else{
      this.isAvailable = false
    }
  }


}
