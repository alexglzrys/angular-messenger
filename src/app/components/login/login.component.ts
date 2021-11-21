import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  operation: string = 'login'
  email: string = '';
  password: string = ''

  constructor(private authService: AuthService) { }

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
      console.log('logeado correctamente');
    }).catch(error => {
      console.log(error);
      console.log('Error al logear');
    })
  }

  register(event: Event) {
    event.preventDefault()
    event.stopPropagation()

    this.authService.registerWithEmail(this.email, this.password).then(response => {
      console.log(response);
      console.log('registrado correctamente');
    }).catch(error => {
      console.log(error);
      console.log('Error al registrar');
    })
  }

}
