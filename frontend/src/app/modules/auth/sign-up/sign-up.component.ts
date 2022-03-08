import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Validation from 'src/app/modules/utils/validation';
import { User } from 'src/app/shared/User/user.model';
import { UserService } from 'src/app/shared/User/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/Notification/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup = new FormGroup({
    fName: new FormControl(''),
    lName: new FormControl(''),
    email: new FormControl(''),
    pNumber: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  model:any={}
  loggedIn: boolean;

  constructor(private formBuilder: FormBuilder, private service: UserService,
    private router: Router, private notifyService: NotificationService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fName: ['', Validators.required],
        lName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        pNumber: ['', [Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(8), Validators.maxLength(8)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
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
      this.service.postRegister(this.form.value).subscribe(res =>{
        console.log(res); 
        this.notifyService.showSuccess("Registration Successful", "OpenTable");
        this.router.navigateByUrl('/viewdetails'); 
      }, error =>{
        console.log(error)
        this.notifyService.showError("Registration Failed", "OpenTable");
      })

    }
  }
}
