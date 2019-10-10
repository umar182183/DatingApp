import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any= {};

  @Output() cancelRegMode = new EventEmitter();
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register()
  {
    this.authService.registerUser(this.model).subscribe(()=>
    {
      console.log("Registered Successfully!");
    },
    error=>
    {
      console.log(error);
    });
    console.log(this.model);
  }

  cancel()
  {
    this.cancelRegMode.emit(false);
    console.log("Cancelled");
  }
}
