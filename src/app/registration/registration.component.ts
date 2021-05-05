import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { PasswordValidator } from './passwordValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private fb:FormBuilder,private auth:AuthserviceService, private route: Router) { }  
  register:any=this.fb.group({
    fname:['',Validators.required],
    lname:['',Validators.required],
    email:['',[Validators.required,Validators.pattern('^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9]{3,9})\.([a-z]{2,5})$')]],
    pass:['',[Validators.required,Validators.minLength(4)]],
    cpass:['',[Validators.required]]

  },{validator: PasswordValidator})

  

  get fname(){
    return this.register.get('fname');
  }
  
  get lname(){
    return this.register.get('lname');
  }
  get email(){
    return this.register.get('email')
  }
  get pass(){
    return this.register.get('pass')
  }
  get cpass(){
    return this.register.get('cpass');
  }

  onSubmit(register) {
    //console.log(register.value);
    this.auth.registerUser(this.register.value)
      .subscribe(
        res => {console.log(res)
        },
        err =>  {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this.route.navigate(['/registration'])
            }
          }
        }
      )
  }
  
}
