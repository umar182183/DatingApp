import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any= {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login()
  {
    this.authService.login(this.model).subscribe(next =>{
      console.log("You are logged in successfully.")
    }, error =>{
      console.log("Oops, Something went wrong!")
    });
  }

  loggedIn()
  {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut()
  {
    localStorage.removeItem('token');
    console.log("You're logged out!");
  }
}
