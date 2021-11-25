import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { User } from 'src/app/shared/interfaces/user/user';
import { StorageService } from 'src/app/core/services/storage/storage.service';

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
              private authService: AuthService,
              private storage: StorageService) { }

  ngOnInit(): void {
    this.authService.getStatus().subscribe(status => {
      this.friendsService.searchFriend(status?.uid).subscribe(resp => {
        this.user = resp.data()
        console.log(this.user);
      })
    })
  }

  saveSettings() {
    if (this.croppedImage !== 'assets/img/generic_avatar.png') {
      // Guardar la imagen cortada en firebase storage
      this.storage.uploadAvatar(this.croppedImage).subscribe(resp => {
        console.log(resp)
        // Registrar la URL de imagen como parte del registro del usuario
        this.friendsService.setAvatar(resp, this.user?.uid).then(response => {
          alert('Avatar cambiados')
        }).catch(err => {
          alert('Error tras actualizar el avatar')
        })
      })
    } else {
      // Guardar los datos que están en el formulario
      this.friendsService.updateUser(this.user!).then(resp => {
        alert('Datos cambiados')
      }).catch(err => {
        alert('Error tras actualizar el perfil')
      })
    }
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
