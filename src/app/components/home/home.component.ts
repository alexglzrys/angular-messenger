import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { RequestService } from 'src/app/core/services/request/request.service';
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

  // Modelo para el correo electrónico del amigo a enviar solicitud de amistad
  friend_email: string = '';

  constructor(private friendsService: FriendsService,
              private authService: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private requestService: RequestService) { }

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

  // Abrir el modal. (tagTemplate enviado como argumento a la función)
  open(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  // Tarea para enviar solicitud de amistad al email seleccionado
  sendRequest() {
    // Generar el cuerpo de una nueva solicitud de amistad
    const myRequestFriend = {
      status: 'Pending',
      timestamp: Date.now(),
      receiver_email: this.friend_email,
      sender: this.user?.uid
    }

    // Enviar la petición
    this.requestService.createRequest(myRequestFriend).then(() => {
      alert('Solicitud enviada con éxito')
      this.modalService.dismissAll();
    }).catch(err => {
      alert('Hubo un error')
      console.log(err)
    })
  }

}
