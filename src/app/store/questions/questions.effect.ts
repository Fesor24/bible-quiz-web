import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getQuestionScripture, loadQuestions, loadQuestionsSuccess, updateQuestionScripture } from "./questions.actions";
import { EMPTY, catchError, exhaustMap, map, of, tap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { SectionService } from "src/app/section/section.service";
import { Store } from "@ngrx/store";
import { questionsSelector } from './questions.selectors';
import { IQuestionStore } from "./questions.reducer";

@Injectable()
export class QuestionEffects {
  loadQuestions$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadQuestions),
      withLatestFrom(this.store.select(questionsSelector)),
      exhaustMap(([action, state]) =>
        this.sectionService.getQuestions(action.source).pipe(
          // tap(questions => console.log(questions)),
          tap(() => console.log(state)),
          map((questions) =>
            loadQuestionsSuccess({ data: questions, source: action.source })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadQuestionScripture = createEffect(() =>
    this.action$.pipe(
      ofType(getQuestionScripture),
      exhaustMap((action) =>
        this.sectionService.getQuestionPassage(action.questionId).pipe(
          // tap((res) => console.log(res)),
          map((res) =>
            updateQuestionScripture({
              questionId: action.questionId,
              source: action.source,
              passage: res.passage,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private sectionService: SectionService,
    private store: Store<{ question: IQuestionStore }>
  ) {}
}
