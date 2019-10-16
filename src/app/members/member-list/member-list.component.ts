import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';
import { AlertifysService } from '../../_services/alertifys.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private userService: UserService, private alertify: AlertifysService, private route: ActivatedRoute) { }

  users: User[];

  ngOnInit() {

    this.route.data.subscribe(data =>{
      this.users = data['users'];
    });
  }


  // loadUsers()
  // {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   },
  //   errors =>{
  //     this.alertify.error(errors);
  //   });
  // }

}
