import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'BibleQuiz';

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token)?.subscribe((response) =>{

      }, error => console.log(error));

  }

}
