import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { SectionService } from '../section.service';
import { IQuestion } from 'src/app/shared/models/question';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { bibleQuizzesQuestionSelector } from 'src/app/store/questions/questions.selectors';
import { IQuestionStore } from 'src/app/store/questions/questions.reducer';
import { loadQuestions } from 'src/app/store/questions/questions.actions';
import { QuestionSource } from 'src/app/shared/enums/question-source.enum';

@Component({
  selector: 'app-biblequizzes-questions',
  templateUrl: './biblequizzes-questions.component.html',
  styleUrls: ['./biblequizzes-questions.component.css'],
})
export class BiblequizzesQuestionsComponent implements OnInit {
  questions$!: Observable<IQuestion[]>;

  index = 0;

  constructor(
    private store: Store<{question: IQuestionStore}>
  ) {
    this.questions$ = this.store.select(bibleQuizzesQuestionSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(loadQuestions({source: QuestionSource.BibleQuizzes}));
    this.getIndex();
  }

  getIndex() {
    const index = localStorage.getItem('section_a_index');

    if (index) {
      this.index = parseInt(index);
    }
  }
}
