import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../User/user.service';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(public services: UserService, private http: HttpClient, 
    private router: Router) { }

  readonly baseURL = 'http://localhost:9800/api/';

  id = this.services.currentUser$;

  // getBookings(id){
  //   return this.http.get(this.baseURL+'Bookings/ViewBookings', {
  //     params:{
  //       id:id
  //     }
  //   }).pipe(
  //     map((response:Booking) =>{
  //       const bookingDetails = response; 
  //       if (bookingDetails){
  //         console.log(JSON.stringify(bookingDetails),null,2);
  //       }
  //     })
  //   ); 
  // }

  postBooking(model:any){
    return this.http.post(this.baseURL+'Bookings', model).pipe(
      map((response:Booking) =>{
        console.log("Booking Added"); 
      })
    ); 
  }

}
