import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { AlertifysService } from '../_services/alertifys.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
@Injectable()
export class UserListResolver implements Resolve<User[]> {

    constructor(private userService: UserService, private alertify: AlertifysService, private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>
    {
        return this.userService.getUsers().pipe(
            catchError(error =>{
                this.alertify.error("Problem Retrieving Data");
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
