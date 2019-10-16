import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';



@Injectable({
  providedIn: 'root'
})



export class UserService {

  baseURL = environment.apiURL;
  user : User;
  

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable <User[]>
  {
    return this.httpClient.get<User[]>(this.baseURL+"users");
  }

  getUser(id: number): Observable <User>
  {
    return this.httpClient.get<User>(this.baseURL+"users/"+id);
  }
}
