import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { User } from 'src/app/shared/interfaces/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User | undefined;

  constructor(private friendsService: FriendsService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getStatus().subscribe(status => {
      this.friendsService.searchFriend(status?.uid).subscribe(resp => {
        this.user = resp.data()
        console.log(this.user);
      })
    })
  }

  saveSettings() {
    this.friendsService.updateUser(this.user!).then(resp => {
      alert('Datos cambiados')
    }).catch(err => {
      alert('Error tras actualizar el perfil')
    })
  }

}
