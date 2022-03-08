import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/User/user.service';
import { BookingService } from 'src/app/shared/Booking/booking.service';
import { HttpClient } from '@angular/common/http';
import { Booking } from 'src/app/shared/Booking/booking.model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/Notification/notification.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})

export class ViewDetailsComponent implements OnInit {
  closeResult = '';
  submitted = false;
  submittedBook = false;
  fname: string;
  id: number;
  data: any = [];
  locationDel: string;
  dateDel: string;
  timeDel: string;
  bookingDel: number;


  formBook: FormGroup = new FormGroup({
    Location: new FormControl(''),
    Date: new FormControl(''),
    Time: new FormControl(''),
  });
  formUpdate: FormGroup = new FormGroup({
    locationUpdate: new FormControl(''),
    dateUpdate: new FormControl(''),
    timeUpdate: new FormControl(''),
  });


  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, public services: UserService,
    public bookingServices: BookingService, private http: HttpClient, private router: Router,
    private notifyService: NotificationService) { }

  ngOnInit(): void {
    var users = JSON.parse(localStorage.getItem('user'));

    //checking if users was login 
    if (users === null) {
      this.router.navigateByUrl('/signin');
    }
    else {
      this.fname = users.fname;

      this.id = users.id;

      //validating form to add booking
      this.formBook = this.formBuilder.group(
        {
          Location: ['', Validators.required],
          Date: ['', Validators.required],
          Time: ['', Validators.required]
        }
      );

      //validating form to update booking
      this.formUpdate = this.formBuilder.group(
        {
          idUpdate: [''],
          locationUpdate: ['', Validators.required],
          dateUpdate: ['', Validators.required],
          timeUpdate: ['', Validators.required]
        }
      );

      //get all booking for the logged in user
      this.getBooking(this.id);
    }

  }

  // Open modal for update
  open(content: any, book) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then((result) => {

        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });


    this.formUpdate.patchValue({
      idUpdate: book.id,
      locationUpdate: book.location,
      dateUpdate: book.date,
      timeUpdate: book.time
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //Open Modal for Delete
  opendel(content: any, book) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then((result) => {
        console.log("result: " + result)
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

    this.locationDel = book.location;
    this.dateDel = book.date;
    this.timeDel = book.time;
    this.bookingDel = book.id;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formBook.controls;
  }

  //Add Booking 
  onBook(): void {
    this.submittedBook = true;

    if (this.formBook.invalid) {
      return;
    }
    else {
      var users = JSON.parse(localStorage.getItem('user'));

      this.id = users.id;
      console.log(this.id);
      

      //creating object to add booking
      var add_booking = new Booking();
      add_booking["Location"] = this.formBook.value.Location;
      add_booking["Date"] = this.formBook.value.Date;
      add_booking["Time"] = this.formBook.value.Time;
      add_booking["UserId"] = this.id;

      console.log("add: " + JSON.stringify(add_booking));


      //api called to add new booking
      this.bookingServices.postBooking(add_booking).subscribe(res => {
        console.log("res: " + res);
        
        this.notifyService.showSuccess("Add booking Successful", "OpenTable");
        this.getBooking(this.id);
      }, error => {
        console.log(error)
        
        this.notifyService.showError("Add booking Failed", "OpenTable");
      })

    }
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.formUpdate.controls;
  }

  // on form submit for update
  onSubmit(): void {
    this.submitted = true;

    if (this.formUpdate.invalid) {
      return;
    }
    else {

      var users = JSON.parse(localStorage.getItem('user'));

      this.id = users.id;
      console.log(this.id);

      //creating object for updating booking
      var update_booking = new Booking();
      update_booking["Id"] = this.formUpdate.value.idUpdate;
      update_booking["Location"] = this.formUpdate.value.locationUpdate;
      update_booking["Date"] = this.formUpdate.value.dateUpdate;
      update_booking["Time"] = this.formUpdate.value.timeUpdate;
      update_booking["UserId"] = this.id;


      console.log("update: " + JSON.stringify(update_booking));

      //calling api to update booking 
      this.updateBooking(this.formUpdate.value.idUpdate, update_booking);
    }

  }

  onReset(): void {
    this.submitted = false;
    this.formUpdate.reset();
  }

  //method to call api  to get all booking for a specific user
  getBooking(id: number) {
    this.http.get('http://localhost:9800/api/Bookings/ViewBookings', {
      params: {
        id: id
      },
      observe: 'response'
    }).subscribe(
      (response) => {
        this.data = response.body;
      },
      (error) => {
        console.log("error: " + error)
      }
    )
  }


  //method to call api for update booking
  updateBooking(id: number, update_booking) {

    console.log("id: " + id);
    console.log("qwerty: " + JSON.stringify(update_booking));

    this.http.put("http://localhost:9800/api/Bookings/" + update_booking["Id"],
      update_booking)
      .subscribe(
        val => {
         
          this.notifyService.showSuccess("Update booking Failed", "OpenTable");
          this.getBooking(this.id);
        },
        response => {
          this.notifyService.showError("Update booking Failed", "OpenTable");
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }

   //method to call api for delete booking
  deleteBooking(bookingId) {
    console.log("id: " + bookingId);

    this.http.delete("http://localhost:9800/api/Bookings/" + bookingId)
      .subscribe(
        val => {
          this.notifyService.showSuccess("Delete booking Successful", "OpenTable");
          this.getBooking(this.id);
        },
        response => {
          this.notifyService.showError("Delete booking Failed", "OpenTable");
        },
        () => {
          console.log("The Delete observable is now completed.");
        }
      );

  }

}
