import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
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
  imageChangedEvent: any = '';
  croppedImage: any = 'assets/img/generic_avatar.png';

  showAreaCrop: boolean = false

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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    // Mostrar área para empezar a recortar la imagen seleccionada
    this.showAreaCrop = true;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

}
