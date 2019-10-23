import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AlertifysService } from 'src/app/_services/alertifys.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Photo } from 'src/app/_models/photo.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  
  @ViewChild('editForm', {static: false}) editForm: NgForm;
  @HostListener('window: beforeunload', ['$event'])

  photoUrl: string;

  unloadNotification($event: any)
  {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  user: User;

  constructor(private route: ActivatedRoute, private alertify: AlertifysService, private service: UserService, private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.user = data['user'];
    });

    this.auth.currentPhotoUrl.subscribe(m => this.photoUrl = m);
  }

  updateUser()
  {
    this.service.UpdateUser(this.auth.decodeToken.nameid, this.user).subscribe(next => {
      this.editForm.reset(this.user);
      this.alertify.success("Profile updated successfully");
    }, error =>{
      this.alertify.error(error);
    });
  }

  updateMainPhoto(photoUrl)
  {
    this.user.photoURL = photoUrl;
  }
}
