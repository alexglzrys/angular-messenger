import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { User } from 'src/app/shared/interfaces/user/user';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  friendId!: string;  // Indicarle a TS que confie en nosotros, esta propiedad va a tener un string (marca error por no inicializarla aqui o en constructor)
  friend!: User | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private friendsService: FriendsService) { }

  ngOnInit(): void {
    // Recuperar el parámetro enviado a la ruta
    this.activatedRoute.params.subscribe((params: Params) => {
      this.friendId = params.uid;
      this.fetchFriend(this.friendId);
      console.log(this.friendId);
    })
  }

  fetchFriend(uid: string) {
    this.friend = this.friendsService.getFriend(uid);
  }

}
