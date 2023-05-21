import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import {IQuestion} from '../shared/models/question'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions!: IQuestion[] ;

  constructor(private quesService: QuestionService){}

  ngOnInit(): void {
    this.getFesorQuestions();
  }

  getFesorQuestions(){
    this.quesService.getFesorQuestions().subscribe(
      (response) => {
        if (response?.successful) {
          this.questions = response.result as IQuestion[];
        } else {
          console.log('error', response?.errorMessage);
        }

        console.log(this.questions[0]);
      },
      (error) => console.log(error)
    );
  }
}
