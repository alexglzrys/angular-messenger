import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { User } from 'src/app/shared/interfaces/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  operation: string = 'login'
  email: string = '';
  password: string = ''
  nick: string = ''

  constructor(private authService: AuthService,
              private friendsService: FriendsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  changeOperation(event: Event, value: string) {
    event.preventDefault()
    event.stopPropagation()

    this.operation = value;
  }

  login(event: Event) {
    event.preventDefault()
    event.stopPropagation()

    this.authService.loginWithEmail(this.email, this.password).then(response => {
      console.log(response);
      // Navegar al home
      this.router.navigate(['/home'])
    }).catch(errors => {
      console.log(errors);
      console.log('Error al logear');
    })
  }

  register(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    // Registrar el usuario
    this.authService.registerWithEmail(this.email, this.password).then(response => {
      const myUser: User = {
        uid: response.user?.uid,
        email: this.email,
        nick: this.nick
      }
      // Guardar su información en la base de datos
      this.friendsService.registerFriend(myUser).then(data => {
        this.router.navigate(['/login'])
      })

    }).catch(error => {
      console.log(error);
      console.log('Error al registrar');
    })
  }

}
