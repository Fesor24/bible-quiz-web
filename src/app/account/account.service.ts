import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { IApiResponse } from '../shared/models/api-response';
import { ReplaySubject, catchError, map, of } from 'rxjs';
import { IAccount } from '../shared/models/account';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AccountService implements OnInit {

  baseUrl = environment.apiUrl;

  currentUserSource = new ReplaySubject<IAccount | null>(1)

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient, private toastr: ToastrService) { }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login(values: any){
     return this.http.post<IApiResponse<IAccount, object, object>>(this.baseUrl + 'login', values).pipe(
      map((response: IApiResponse<IAccount, object, object>) => {
        if(response.successful){
          localStorage.setItem('token', response.result.token)
          this.currentUserSource.next(response.result);
          this.toastr.success("Logged In");
          console.log("logged in");
          return response.result;
        }
        else{
          console.log('error', response.errorMessage)
          this.toastr.error(response.errorMessage);
          return null;
        }
      })
    )
  }

  register(values:any){

    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    console.log(headers);

    return this.http.post<IApiResponse<IAccount, object, object>>(this.baseUrl + 'register', values, {headers})
    .pipe(
      map((response: IApiResponse<IAccount, object, object>) => {
        if(response.successful){
          this.toastr.success("User created");
          // localStorage.setItem('token', response.result.token);
          // this.currentUserSource.next(response.result);
        }
        else{
          console.log(response.errorMessage);
          this.toastr.error(response.errorMessage)
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }

  loadCurrentUser(token:string | null){

    if(token === null){
      this.currentUserSource.next(null);
      return of();
    }

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IApiResponse<IAccount, object, object>>(this.baseUrl + 'current-user', {headers}).pipe(
      map((response: IApiResponse<IAccount, object, object>) =>{
        if(response.successful){
          localStorage.setItem('token', response.result.token)
          this.currentUserSource.next(response.result);
        }
        else{
          this.currentUserSource.next(null);
        }
      },
      ),
      catchError((error) => {
        this.currentUserSource.next(null);
        return of();
      })
    )
  }


}
