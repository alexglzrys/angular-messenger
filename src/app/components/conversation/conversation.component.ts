import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  friendId!: string;  // Indicarle a TS que confie en nosotros, esta propiedad va a tener un string (marca error por no inicializarla aqui o en constructor)

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Recuperar el parámetro enviado a la ruta
    this.activatedRoute.params.subscribe((params: Params) => {
      this.friendId = params.uid;
      console.log(this.friendId);
    })
  }

}
