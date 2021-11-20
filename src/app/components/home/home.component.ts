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
    this.friends = this.friendsService.getAllFriends();
  }

}
