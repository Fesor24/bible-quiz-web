import { createAction, props } from "@ngrx/store";
import { QuestionSource } from "src/app/shared/enums/question-source.enum";
import { IQuestion } from "src/app/shared/models/question";

export const loadQuestions = createAction(
  "[Question Load]",
  props<{source: QuestionSource}>()
);

export const init = createAction(
  "[Question Init]"
);

export const loadQuestionsSuccess = createAction(
  "[Question Author Load Success]",
  props<{data: IQuestion[], source: QuestionSource}>()
)

export const getQuestionScripture = createAction(
  "[Question] Scripture",
  props<{questionId: number, source: QuestionSource}>()
)

export const updateQuestionScripture = createAction(
  "[Question] Scripture Update",
  props<{questionId: number, source: QuestionSource, passage: string}>()
)
