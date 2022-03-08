import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Validation from 'src/app/modules/utils/validation';
import { UserService } from 'src/app/shared/User/user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/Notification/notification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  loggedIn: boolean;

  constructor(private formBuilder: FormBuilder, private service: UserService,
    private http: HttpClient, private router: Router,
    private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    else {
      console.log(JSON.stringify(this.form.value, null, 2));
      this.service.postLogin(this.form.value).subscribe(res => {
        console.log("res: " + res);
        this.loggedIn = true;
        this.notifyService.showSuccess("Login successful", "OpenTable")
        this.router.navigateByUrl('/viewdetails');
      }, error => {
        console.log(error.error)
        if (error.error == "Invalid Password") {
          console.log("msg send invalid password");
          this.notifyService.showError("Invalid Password", "OpenTable")
        }
        else if (error.error == "Invalid Username") {
          console.log("msg send invalid password");
          this.notifyService.showError("Invalid Username", "OpenTable")
        }
      })

    }
  }


  // showToasterSuccess() {
  //   this.toastr.success("message", "title")
  // }

  // showToasterError() {
  //   this.notifyService.showError("Something is wrong", "tutsmake.com")
  // }

  // showToasterInfo() {
  //   this.notifyService.showInfo("This is info", "tutsmake.com")
  // }

  // showToasterWarning() {
  //   this.notifyService.showWarning("This is warning", "tutsmake.com")
  // }

}
