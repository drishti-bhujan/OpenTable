import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IUser } from './shared/User/Iuser';
import { UserService } from './shared/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Resturant Booking App';

  constructor (private http:HttpClient, private service:UserService){}

  ngOnInit(): void {
    this.setCurrentUser(); 
  
  }

  setCurrentUser(){
    const user:IUser = JSON.parse(localStorage.getItem('user')); 
    this.service.setCurrentUser(user); 
  }

}
