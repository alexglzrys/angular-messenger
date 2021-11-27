import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ConversationService } from 'src/app/core/services/conversation/conversation.service';
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
  user!: User | undefined;
  conversation_id!: string;
  textMessage!: string
  conversation!: any[]

  constructor(private activatedRoute: ActivatedRoute,
              private friendsService: FriendsService,
              private conversationService: ConversationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    // Recuperar el parámetro enviado a la ruta
    this.activatedRoute.params.subscribe((params: Params) => {
      this.friendId = params.uid;
      // Buscar la información del amigo con el cual quiero conversar
      this.fetchFriend(this.friendId);
    })
  }

  fetchFriend(uid: string) {
    //this.friend = this.friendsService.getFriend(uid);

   // Determinar quien es el amigo con el que quiero platicar (recuperar id de firebase)
    this.friendsService.searchFriend(uid).subscribe(resp => {
      if (resp.exists) {
        this.friend = resp.data();
        // Determinar quien soy yo (recuperar el id de firebase)
        this.authService.getStatus().subscribe(session => {
          this.friendsService.searchFriend(session?.uid).subscribe((user) => {
            if (user.exists) {
              this.user = user.data()
              // Generar un hash a partir de los ids involucrados (pero en orden)
              // Esto nos permite en el futuro agrupar las conversaciones que han tenido dos amigos durante la historia
              const ids = [this.user?.uid, this.friend?.uid].sort()
              this.conversation_id = ids.join('-')  // el hash resultate sera isdnsdisdis-qwesddsdsd
              this.getConversation(this.conversation_id)
            }
          })
        })
      }
    })
  }

  sendMassage() {
    // El cuerpo del mensaje que se genera al momento de la conversación
    // Importa mucho los ids de quien envia y recibe, la marca de tiempo en la cual se envio este mensaje, su contenido y su uid
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user?.uid,
      receiver: this.friend?.uid
    }
    // Se envia el mensaje al servicio para que se registre en firebase, y limpiar el mensaje de la caja
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = ''
    }).catch(err => {
      console.log(err)
    })
  }

  getConversation(uid: any) {
    // Obtener todas las conversaciones de estos dos amigos
    this.conversationService.getConversation(uid).subscribe((res) => {
      let temporal: any[] = []
      res.forEach(doc => {
        let message: any = doc.data()
        // Verificar si el mensaje no ha sido visto (en este caso, es nuevo y se debe reproducir un sonido)
        if (!message.seen) {
          message.seen = true
          // Actualizar el estado de visto en true para este mensaje en base de datos
          this.conversationService.editConversation(message).then(() => {
            const audio = new Audio('assets/sound/new_message.m4a')
            audio.play()
          })
        }
        temporal.push(message)
      })
      // Almacenar el listado de mensajes en el modelo de este componente
      this.conversation = [...temporal]
      console.log(temporal)
    }, (error) => {
      console.log(error)
    })
  }

  // Recuperar el nickname del usuario que escribio el mensaje a partir de su uid
  getUserNickById(uid: any) {
    if (uid === this.friend?.uid) {
      return this.friend?.nick
    } else {
      return this.user?.nick
    }
  }

}
