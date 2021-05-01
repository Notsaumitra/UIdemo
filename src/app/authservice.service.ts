import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private loginUrl="http://localhost:3000/api/login";
  private verifyUrl="http://localhost:3000/api/special";

  constructor(private http:HttpClient, private route: Router) { }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  loginUser(user: any){
    return this.http.post<any>(this.loginUrl,user)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getVerified(){
    return this.http.get<any>(this.verifyUrl);
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.route.navigate(['/events'])
  }
}
