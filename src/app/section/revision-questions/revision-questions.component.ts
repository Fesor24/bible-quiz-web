import { Component, OnInit } from '@angular/core';
import { SectionService } from '../section.service';
import { IQuestion, ISaveQuestion } from 'src/app/shared/models/question';

@Component({
  selector: 'app-revision-questions',
  templateUrl: './revision-questions.component.html',
  styleUrls: ['./revision-questions.component.css']
})
export class RevisionQuestionsComponent implements OnInit {

  savedQuestions!: IQuestion[];

  constructor(private sectionService: SectionService){}

  ngOnInit(): void {
    this.getSavedQuestions();
  }

  getSavedQuestions(){

    const token = localStorage.getItem('token');

    if(token){
      this.sectionService.getSavedQuestions(token).subscribe((response) => {
        if (response?.successful) {
          this.savedQuestions = response.result as IQuestion[];
        } else {
          console.log(response?.errorMessage);
        }
      });
    }
    }



}
