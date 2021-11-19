import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: User[];

  constructor() {
    let myUser = {
      nick: 'Alejandro',
      subnick: 'alex',
      age: 36,
      friend: false,
      email: 'alejandro@correo.com',
      uid: '1'
    }
    this.users = [myUser]
    console.log(this.users)
  }

  ngOnInit(): void {
  }

}
