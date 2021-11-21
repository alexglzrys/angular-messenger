import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { User } from 'src/app/shared/interfaces/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  friends!: User[];
  query: string = ''

  constructor(private friendsService: FriendsService) { }

  ngOnInit(): void {
    this.fetchFriends()
  }

  fetchFriends() {
    let temporal!: User[];
    this.friendsService.listFriends().subscribe(resp => {
      resp.forEach(doc => {
        temporal.push(doc.data())
      })
      this.friends = [...temporal]
    })
    /*this.friendsService.listFriends().subscribe(resp => {
      resp.docs.forEach(doc => {
        temporal.push(doc.data())
        console.log(doc.data());
      })
      //this.friends = [...temporal]

    })*/
  }

}
