import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

/**
 * Servicio para enviar solicitudes de amistad
 */

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private af: AngularFirestore) { }

  // Crear solicitud de amistad
  // Se genera un path en base de datos llamado request, internamente aparece una colección con el email del amigo que se le envió la solicitud de amistad.
  // Internamente aparece /invites/ con varios documentos, cada uno con información de una nueva solicitud en espera de aceptación o rechazo
  createRequest(myRequest: any): Promise<void> {
    // Como el email va a ser una colección, necesitamos limpiarlo de caracteres no permitidos (Firebase toma los puntos como collection.document), en este caso reemplazo los puntos por comas
    const cleanEmail = myRequest.receiver_email.replaceAll('.', ',');

    // requests/correo_amigo@email,com,mx/sender_uid/documento_info
    return this.af.collection('requests/' + cleanEmail + '/invites').doc(myRequest.sender).set(myRequest);
  }
}
