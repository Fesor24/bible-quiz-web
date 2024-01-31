export interface IQuestion{
  id: number;
  question: string;
  answer: string;
  verse: string;
  source: string;
  passage: string;
}

export interface ISaveQuestion{
  question: string;
  answer: string;
}

export interface IQuestionScripture{
  questionId: number;
  passage: string;
}
