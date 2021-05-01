import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  register:FormGroup;

  constructor(private fb:FormBuilder,
    private auth:AuthserviceService,
    private route:Router) { }

  get email() {
    return this.register.get('email');
  }

  get password() {
    return this.register.get('password');
  }

  ngOnInit() {
    this.register = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  onSubmit(register) {
    //console.log(register.value);
    this.auth.loginUser(this.register.value)
      .subscribe(
        res => {console.log(res)
              localStorage.setItem('token',res.token);
              this.route.navigate(['/special'])
        },
        err =>  {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this.route.navigate(['/login'])
            }
          }
        }
      )
  }

}
