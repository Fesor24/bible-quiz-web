import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef, DoCheck } from '@angular/core';
import { IQuestion, ISaveQuestion } from '../models/question';
import { ToastrService } from 'ngx-toastr';
import { SectionService } from 'src/app/section/section.service';
import { SharedService } from '../shared.service';
import { IScriptureSearch } from '../models/bible-scripture-search';
import { Store } from '@ngrx/store';
import { getQuestionScripture } from 'src/app/store/questions/questions.actions';
import { AUTHOR_SOURCE, BIBLEQUIZZES_SOURCE, QuestionSource } from '../enums/question-source.enum';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy, DoCheck {
  constructor(
    private toastr: ToastrService,
    private sectionService: SectionService,
    private changeRef: ChangeDetectorRef,
    private sharedService: SharedService,
    private store: Store
  ) {}

  constTimerValue = 30;

  @Input() index = 0;

  bookName!: string;

  content!: string;

  timer = 30;

  isAvailable: boolean = false;

  intervalId: any;

  showAnswer = false;

  modalDisplay = false;

  oldArrayLength = 0;

  resetValue = 0;

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
    if (this.questions && this.questions.length !== this.oldArrayLength) {
      this.oldArrayLength = this.questions.length;
      this.setIsAvailable();
      this.changeRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  receiveModalBoolValue(value:boolean){
    this.modalDisplay = value;
  }

  handleNext() {
    this.stopTimer();
    this.showAnswer = false;
    if ((this.questions && this.questions.length - 1) == this.index) {
      this.showCongratsPage = true;
      this.resetProgress();
    } else {
      this.index++;
      this.saveProgressInLocalStorage();
      this.timer = this.constTimerValue;
      this.startTimer();
    }
  }

  handlePrevious() {
    this.stopTimer();
    this.showAnswer = false;
    if (this.index == 0) {
      this.index = 0;
    } else {
      this.index--;
      this.timer = this.constTimerValue;
      this.startTimer();
    }
  }

  resetProgress(){

    this.index = 0;

     if (this.isFesorQuestion) {
       localStorage.setItem('section_b_index', this.resetValue.toString());
     }

     if (this.isSavedQuestions) {
       localStorage.setItem('saved_index', this.resetValue.toString());
     }

     if (this.isThousandQuestion) {
       localStorage.setItem('section_a_index', this.resetValue.toString());
     }
  }

  saveProgressInLocalStorage(){
      if (this.isFesorQuestion) {
        localStorage.setItem('section_b_index', this.index.toString());
      }

      if (this.isSavedQuestions) {
        localStorage.setItem('saved_index', this.index.toString());
      }

      if (this.isThousandQuestion) {
        localStorage.setItem('section_a_index', this.index.toString());
      }
  }

  handleReset() {
    this.resetProgress();

    this.toastr.success('Progress reset');
  }

  handleDisplayAnswer() {
    this.showAnswer = true;
    this.stopTimer();
  }

  setTimerValue(timer: number): string {
     if (timer == 10) {
       this.sharedService.startTickingClock();
     }
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
        this.sharedService.stopTickingClock();
        this.stopTimer();
        this.showAnswer = true;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  showModal() {
    this.modalDisplay = true;
    // console.log(this.questions[this.index].answer)
    this.getScriptures();
  }

  getScriptures(){
    let answer = this.questions[this.index].answer;

    let body: IScriptureSearch = {
      bibleVerse: answer
    }

    this.sharedService.getScriptures(body).subscribe((response)=> {
      if(response?.successful){
        this.content = response.result.data.passages[0].content;
        this.bookName = response.result.data.passages[0].reference;

      }
      else{
        this.content = '<p>Unable to get this Bible verse at the moment. Sorry about this</p>'
        this.bookName = "No scripture found"
      }
    }, error => {
      console.log(error)
    })
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
      if (response.successful) {
        this.toastr.success('Saved Questions Deleted');
        this.questions = [];
        this.setIsAvailable();
      } else {
        console.log(response.errorMessage);
      }
    });
  }

  setIsAvailable() {
    if (this.questions && this.questions.length > 0) {
      this.isAvailable = true;
    } else {
      this.isAvailable = false;
    }
  }

  getQuestionScripture(questionId: number, source: string){
    let questionSource = QuestionSource.Author;

    if(source === BIBLEQUIZZES_SOURCE){
      questionSource = QuestionSource.BibleQuizzes;
    }
    else if(source === AUTHOR_SOURCE){
      questionSource = QuestionSource.Author
    }else{
      return;
    }

    this.store.dispatch(getQuestionScripture({questionId: questionId, source: questionSource}))
  }
}
