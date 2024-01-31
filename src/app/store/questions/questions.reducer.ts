import { createReducer, on } from "@ngrx/store";
import { IQuestion } from "src/app/shared/models/question";
import { loadQuestionsSuccess, updateQuestionScripture } from "./questions.actions";
import { QuestionSource } from "src/app/shared/enums/question-source.enum";

export interface IQuestionStore {
  bibleQuizzes: IQuestion[];
  author: IQuestion[];
}

const initialState: IQuestionStore = {
  bibleQuizzes: [],
  author: []
};

export const questionReducer = createReducer(
  initialState,
  on(loadQuestionsSuccess, (state, action) => {
    if(action.source === QuestionSource.Author){
      return({...state, author: action.data});
    }else if(action.source === QuestionSource.BibleQuizzes){
      return({...state, bibleQuizzes: action.data})
    }else
      return state;
  }),
  on(updateQuestionScripture, (state, action) => {
    if(action.source === QuestionSource.Author){
      const updatedAuthorQuestions = state.author.map((question) => question.id === action.questionId ?
      {...question, passage: action.passage} : question);
      return({...state, author: updatedAuthorQuestions})
    }else{
      const updatedQuizzesQuestions = state.bibleQuizzes.map((question) => question.id === action.questionId ?
      {...question, passage: action.passage} : question);

      return({...state, bibleQuizzes: updatedQuizzesQuestions})
    }
  })
);
