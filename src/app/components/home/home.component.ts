import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { User } from 'src/app/shared/interfaces/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  friends!: User[];
  query: string = '';
  user!: User | undefined;

  constructor(private friendsService: FriendsService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchFriends()
    this.loadDataUser()
  }

  fetchFriends() {
    let temporal: User[] = [];
    this.friendsService.listFriends().subscribe(resp => {
      resp.forEach(doc => {
        temporal.push(doc.data())
      })
      this.friends = [...temporal]
    })
  }

  loadDataUser() {
    this.authService.getStatus().subscribe(status => {
      this.friendsService.searchFriend(status?.uid).subscribe(resp => {
        this.user = resp.data();
      })
    })
  }

  logout() {
    this.authService.logout().then(resp => {
      this.router.navigate(['/login'])
    })
  }

}
