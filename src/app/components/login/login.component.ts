import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  operation: string = 'login'

  constructor() { }

  ngOnInit(): void {
  }

  changeOperation(event: Event, value: string) {
    event.preventDefault()
    event.stopPropagation()

    this.operation = value;
  }

}
