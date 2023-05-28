import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IAccount } from 'src/app/shared/models/account';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isVisible = false;

  currentUser$!: Observable<IAccount>

  constructor(private accountService: AccountService, private router: Router){}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$ as Observable<IAccount>
  }

  toggleMenu() {
    this.isVisible = !this.isVisible;
  }

  logOut(){
    this.accountService.logout()
    if(this.isVisible){
      this.isVisible = !this.isVisible;
    }

    this.router.navigateByUrl('/');
  }
}
