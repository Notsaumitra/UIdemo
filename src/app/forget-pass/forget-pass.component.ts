import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
  register:FormGroup;

  constructor(private fb:FormBuilder,
    private auth:AuthserviceService,
    private route:Router) { }

    get email() {
      return this.register.get('email');
    }
  

  
    ngOnInit() {
      this.register = this.fb.group({
        email: ['', [Validators.required,Validators.pattern('^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9]{3,9})\.([a-z]{2,5})$')]]
      })
    }
  
  
    onSubmit(register) {
      //console.log(register.value);
      this.auth.loginUser(this.register.value)
        .subscribe(
          res => {console.log(res)
                this.route.navigate(['/special'])
          },
          err =>  {
            if( err instanceof HttpErrorResponse ) {
              if (err.status === 401) {
                this.route.navigate(['/forget'])
              }
            }
          }
        )
    }

  

}
