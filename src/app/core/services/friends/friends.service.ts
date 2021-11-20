import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user/user';

@Injectable({
  providedIn: 'root'    // presente en cualquier componente, no es necesario inyectarlo de forma explicita en los providers de app.module
})
export class FriendsService {

  friends: User[];

  constructor() {
    let user1: User = {
      nick: 'Alejandro',
      subnick: 'alex',
      age: 36,
      isFriend: false,
      email: 'alejandro@correo.com',
      uid: '1'
    }
    let user2: User = {
      nick: 'Daniela',
      subnick: 'dann',
      age: 36,
      isFriend: true,
      email: 'daniela@correo.com',
      uid: '2'
    }
    let user3: User = {
      nick: 'Fernanda',
      subnick: 'fer',
      age: 36,
      isFriend: true,
      email: 'fernanda@correo.com',
      uid: '3'
    }
    let user4: User = {
      nick: 'Melissa',
      subnick: 'meli',
      age: 36,
      isFriend: false,
      email: 'melissa@correo.com',
      uid: '4'
    }
    let user5: User = {
      nick: 'Pedro',
      subnick: 'piter',
      age: 36,
      isFriend: true,
      email: 'pedro@correo.com',
      uid: '5'
    }
    this.friends = [user1, user2, user3, user4, user5]
  }

  getAllFriends(): User[] {
    return [...this.friends];
  }

  getFriend(uid: string): User | undefined {
    return this.friends.find((friend: User) => friend.uid === uid);
  }

}
