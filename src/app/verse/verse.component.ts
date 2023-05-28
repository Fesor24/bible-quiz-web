import { Component, OnInit } from '@angular/core';
import { VerseService } from './verse.service';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.css']
})
export class VerseComponent implements OnInit {

  book!: string;

  passage!: string;

  constructor(private verseService: VerseService){}

  ngOnInit(): void {
    this.getDailyVerse();
  }

  getDailyVerse(){
    this.verseService.getDailyVerse().subscribe((response) =>{
      if(response.successful){
        this.book = response.result.book;
        this.passage = response.result.passage;
      }
      else{
        console.log(response.errorMessage)
      }
    }, error => console.log(error))
  }

}
