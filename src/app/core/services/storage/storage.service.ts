import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { finalize, last, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  uploadAvatar(avatarFile: any): Observable<UploadTaskSnapshot | undefined> {
    const file = avatarFile;
    // El formato png fue establecido por defecto en el componente de cortar imagen.
    // Por otra parte, el componente nos retorna una imagen en base64. Por lo que el proceso de subida difiere de un archivo binario
    const fileName = Date.now() + '.png';
    const filePath = 'pictures/' + fileName;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.putString(file, 'data_url');

    // Anidar suscripciones en un antipatrón, en lugar de usar finalize() podemos usar last + switchMap, o concat + defer
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    )

  }
}
