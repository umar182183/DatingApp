import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifysService } from '../_services/alertifys.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any= {};

  constructor(public authService: AuthService, private alertifyService: AlertifysService, 
    private router: Router) { }

  ngOnInit() {
  }

  login()
  {
    this.authService.login(this.model).subscribe(next =>{
      this.alertifyService.success("You are logged in successfully.")
    }, error =>{
      this.alertifyService.error("Oops, Something went wrong!")
    }, () =>{
      this.router.navigate(['/members']);
    });
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  loggedOut()
  {
    localStorage.removeItem('token');
    this.alertifyService.message("You're logged out!");
    this.router.navigate(['/home']);

  }
}
