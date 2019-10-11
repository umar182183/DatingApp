import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifysService } from '../_services/alertifys.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router, private alertify: AlertifysService){}

  canActivate(): boolean {
    
    if(this.authService.loggedIn())
    {
      return true;
    }
    
      this.alertify.message("Sorry, You Are Not A Authorized User!!!");
      this.router.navigate(['/home']);
      return false;
  }
  
}
