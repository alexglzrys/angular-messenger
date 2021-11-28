import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFirestore: AngularFirestore) { }

  createConversation(conversation: any): Promise<void> {
    // Generar una colección de 3 niveles - el documento tiene como nombre la marca de tiempo del mensaje, y la conversación es su contenido
    // El nombre del documento tiene que ser un string, por eso uso toString(). de lo contrario falla
    return this.angularFirestore.collection('conversations/' + conversation.uid + '/messages').doc(conversation.timestamp.toString()).set(conversation)
  }

  getConversation(uid: any): Observable<DocumentChangeAction<unknown>[]> {
    // Recuperar el listado de conversaciones que han tenido dos amigos en el tiempo
    // en lugar de get(), uso snapshotChanges(); Ya que me interesa estar atento a los cambios para que se vean reflejados automáticamente en la pantalla
    return this.angularFirestore.collection('conversations/' + uid + '/messages').snapshotChanges();
  }

  editConversation(conversation: any): Promise<void> {
    // Generar una colección de 3 niveles - el documento tiene como nombre la marca de tiempo del mensaje, y la conversación es su contenido
    // El nombre del documento tiene que ser un string, por eso uso toString(). de lo contrario falla
    return this.angularFirestore.collection('conversations/' + conversation.uid + '/messages').doc(conversation.timestamp.toString()).update(conversation)
  }

}
