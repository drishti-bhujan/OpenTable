import { Injectable } from '@angular/core';
import { IUser } from './Iuser';
import {HttpClient} from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router: Router) { }

  //formData:User= new User(); 
  readonly baseURL = 'http://localhost:9800/api/';
  private currentUserSource = new ReplaySubject<IUser>(1); 
  currentUser$ = this.currentUserSource.asObservable(); 

  postRegister(model:any){
    return this.http.post(this.baseURL+'User/Register', model).pipe(
      map((response:IUser) =>{
        const user = response; 
        if (user){
          console.log(JSON.stringify(user),null,2);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user); 
        }
      })
    ); 
  }

  postLogin(model:any){
    return this.http.post(this.baseURL+'User/Login', model).pipe(
      map((response:IUser) =>{
        const user = response; 
        if (user){
          console.log(JSON.stringify(user),null,2);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user); 
        }
      })
    ); 
  }

  setCurrentUser(user:IUser){
    this.currentUserSource.next(user); 
  }

  logout(){
    localStorage.removeItem('user'); 
    this.currentUserSource.next(null); 
    this.router.navigate(['/signin']);
  }

  
}


