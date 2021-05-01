import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private fb:FormBuilder,private auth:AuthserviceService) { }


  
  register:any=this.fb.group({
    fname:['',[Validators.required,Validators.minLength(3)]],
    lname:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    pass:['',Validators.required],
    cpass:['',Validators.required]

  })

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
  
}
