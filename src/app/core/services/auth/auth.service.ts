import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth ) { }

  loginWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  getStatus(): Observable<firebase.User | null> {
    return this.angularFireAuth.authState;
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut()
  }

}
