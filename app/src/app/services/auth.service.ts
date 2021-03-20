import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
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
    
    this.auth.onAuthStateChanged(async user =>{
      if(user){
        let docRef = await this.firestore.doc<User>(`users/${user.uid}`).get().toPromise();
        this.user = docRef.data();
      }
      else{
        this.user = null;
      }
    })
  }

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }
  
  logout() {
    this.auth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData(user) {
    // set user data to firestore
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'user',
    };

    return userRef.set(userData, { merge: true });
  }
}
