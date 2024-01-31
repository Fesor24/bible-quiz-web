import { IQuestionStore } from "./questions.reducer";

export const bibleQuizzesQuestionSelector = (state: {question: IQuestionStore}) => state.question.bibleQuizzes;

export const authorQuestionSelector = (state: {question: IQuestionStore}) => state.question.author;

export const questionsSelector = (state: {question: IQuestionStore}) => state.question;
