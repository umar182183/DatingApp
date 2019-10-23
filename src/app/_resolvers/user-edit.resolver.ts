import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { AlertifysService } from '../_services/alertifys.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UserEditResolver implements Resolve<User> {


    constructor(private userService: UserService, private alertify: AlertifysService, private router: Router,
        private authService: AuthService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>
    {
        return this.userService.getUser(this.authService.decodeToken.nameid).pipe(
            catchError(error =>{
                this.alertify.error("Problem Retrieving your Data");
                this.router.navigate(['/mebers']);
                return of(null);
            })
        );
    }
}
