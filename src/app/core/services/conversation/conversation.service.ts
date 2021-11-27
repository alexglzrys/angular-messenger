import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  getConversation(uid: any): Observable<firebase.firestore.DocumentSnapshot<unknown>> {
    return this.angularFirestore.doc('conversation/' + uid).get();
  }

}
