import { Component, OnInit } from '@angular/core';
import { SectionService } from '../section.service';
import { IQuestion } from 'src/app/shared/models/question';

@Component({
  selector: 'app-fesor-questions',
  templateUrl: './fesor-questions.component.html',
  styleUrls: ['./fesor-questions.component.css']
})
export class FesorQuestionsComponent implements OnInit{

  index: number = 0;

  fesorQuestions!: IQuestion[];

  constructor(private sectionService: SectionService){}

  ngOnInit(): void {
    this.getFesorQuestions();
    this.getIndex()
  }

  getFesorQuestions(){

    const token = localStorage.getItem('token');

    if(token){
       this.sectionService
         .getFesorQuestions(token)
         .subscribe((response) => {
           if (response?.successful) {
             this.fesorQuestions = response.result as IQuestion[];
           } else {
             console.log(response?.errorMessage);
           }
         });
    }


  }

  getIndex(){
    const index = localStorage.getItem('section_b_index');

    if(index){
      this.index = parseInt(index);
    }

  }

}
