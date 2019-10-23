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

  UpdateUser(id: number, user: User)
  {
    return this.httpClient.put(this.baseURL+"users/"+id, user);
  }

  setMainPhoto(userId: number, id: number)
  {
    return this.httpClient.post(this.baseURL+"users/"+userId+"/photos/"+id+"/setMain", {});
  }

  deletePhoto(userId: number, id: number)
  {
    return this.httpClient.delete(this.baseURL+"users/"+userId+"/photos/"+id);
  }
}
