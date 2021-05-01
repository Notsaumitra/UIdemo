import { Component } from '@angular/core';
import { AuthserviceService } from './authservice.service';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini';
//*** make this public otherwise not accessible in html
  constructor(public auth:AuthserviceService){}


}
