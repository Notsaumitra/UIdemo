import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  message:any;
  errMsg:any;

  constructor(private auth:AuthserviceService,
    private route:Router) { }

  ngOnInit(): void {
    this.auth.getVerified()
    .subscribe(
      res=>this.message=res,
      err=>this.errMsg=err
    )

  }

}
