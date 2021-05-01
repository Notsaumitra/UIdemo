import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthserviceService,
    private route:Router){}
  canActivate():boolean{
    if(this.auth.loggedIn()){
      return true;
    }else{
      this.route.navigate(['/login']);
      return false;
    }
  }
  
}
//route guard is a piece of code which controls navigation to and from components
//if returns true normal execution continues else redirected to a route