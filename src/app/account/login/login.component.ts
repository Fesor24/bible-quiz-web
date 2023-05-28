import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm!: FormGroup;

redirectUrl!: string

constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.createLoginForm();
    this.redirectUrl = this.activatedRoute.snapshot.queryParams?.['returnUrl'] || '/section';
  }

createLoginForm(){
  this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
}

onSubmit(){
this.accountService.login(this.loginForm.value).subscribe(() =>{
  this.router.navigateByUrl(this.redirectUrl);
}, error => console.log(error))
}

}
