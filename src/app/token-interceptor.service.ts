import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private auth:AuthserviceService) { }

  intercept(req,next){
    
    //catch the request make its clone
    let tokenReq = req.clone({
      setHeaders:{
        //Authorization:'Bearer xx.yy.zz'
        Authorization:`Bearer ${this.auth.getToken()}`

      }
    })
    return next.handle(tokenReq);//pass the request
  }
}
//HTTPInterceptor intercepts our http requests transforms them and send it to server