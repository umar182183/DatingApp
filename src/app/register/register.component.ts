import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifysService } from '../_services/alertifys.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any= {};

  @Output() cancelRegMode = new EventEmitter();
  constructor(private authService: AuthService, private alertifyService: AlertifysService) { }

  ngOnInit() {
  }

  register()
  {
    this.authService.registerUser(this.model).subscribe(()=>
    {
      this.alertifyService.success("Registered Successfully!");
    },
    error=>
    {
      this.alertifyService.error(error);
    });
  }

  cancel()
  {
    this.cancelRegMode.emit(false);
  }
}
