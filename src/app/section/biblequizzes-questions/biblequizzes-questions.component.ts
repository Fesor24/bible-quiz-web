import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { SectionService } from '../section.service';
import { IQuestion } from 'src/app/shared/models/question';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-biblequizzes-questions',
  templateUrl: './biblequizzes-questions.component.html',
  styleUrls: ['./biblequizzes-questions.component.css'],
})
export class BiblequizzesQuestionsComponent implements OnInit {
  thousandQuestions!: IQuestion[];

  index = 0;

  constructor(
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.getThousandQuestions();
    this.getIndex();
  }

  getThousandQuestions() {
    const token = localStorage.getItem('token');

    if(token){
         this.sectionService
           .getThousandQuestions(token)
           .subscribe((response) => {
             if (response?.successful) {
               this.thousandQuestions = response.result as IQuestion[];
               console.log("Data fetched");
             } else {
               console.log('error', response?.errorMessage);
             }
           });
    }

  }

  getIndex() {
    const index = localStorage.getItem('section_a_index');

    if (index) {
      this.index = parseInt(index);
    }
  }
}
