import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/User/Iuser';
import { UserService } from 'src/app/shared/User/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: any[];
  status: boolean;
  statusLogin:Observable<boolean> ; 


  constructor(public services: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.services.postLogin(this.model).subscribe(res => {
      this.router.navigateByUrl('/viewdetails');
    })
  }

  logout() {
    console.log("logout method"); 
    this.services.logout();
  }

}
