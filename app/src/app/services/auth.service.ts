import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
  ) {

    this.auth.onAuthStateChanged(async user => {
      if (user) {
        let docRef = await this.firestore.doc<User>(`users/${user.uid}`).get().toPromise();
        this.user = docRef.data();
      }
      else {
        this.user = null;
      }
    })
  }

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.auth.signInWithPopup(provider);
  }

  logout() {
    this.auth.signOut();
    return this.router.navigate(['/']);
  }
}
