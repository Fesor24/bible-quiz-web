import { Component, OnInit } from '@angular/core';
import { SectionService } from '../section.service';
import { IQuestion } from 'src/app/shared/models/question';
import { Store } from '@ngrx/store';
import { IQuestionStore } from 'src/app/store/questions/questions.reducer';
import { Observable } from 'rxjs';
import { authorQuestionSelector } from 'src/app/store/questions/questions.selectors';
import { loadQuestions } from 'src/app/store/questions/questions.actions';
import { QuestionSource } from 'src/app/shared/enums/question-source.enum';

@Component({
  selector: 'app-author-questions',
  templateUrl: './author-questions.component.html',
  styles: []
})
export class AuthorQuestionsComponent implements OnInit{

  index: number = 0;
  questions$!: Observable<IQuestion[]>

  fesorQuestions!: IQuestion[];

  constructor(private sectionService: SectionService,
    private store: Store<{question: IQuestionStore}>){
      this.questions$ = this.store.select(authorQuestionSelector)
    }

  ngOnInit(): void {
    this.getIndex();
    this.store.dispatch(loadQuestions({source: QuestionSource.Author}));
  }

  // getFesorQuestions(){

  //   const token = localStorage.getItem('token');

  //   if(token){
  //      this.sectionService
  //        .getFesorQuestions(token)
  //        .subscribe((response) => {
  //          if (response?.successful) {
  //            this.fesorQuestions = response.result as IQuestion[];
  //          } else {
  //            console.log(response?.errorMessage);
  //          }
  //        });
  //   }


  // }

  getIndex(){
    const index = localStorage.getItem('section_b_index');

    if(index){
      this.index = parseInt(index);
    }

  }

}
