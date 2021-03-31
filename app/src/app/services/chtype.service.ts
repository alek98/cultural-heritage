import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { chType } from 'functions/src/models/chType.model';

@Injectable({
  providedIn: 'root'
})
export class ChtypeService {

  constructor(
    private fns: AngularFireFunctions,
    private firestore: AngularFirestore,
  ) { }

  addNewChtype (chtype: chType) {
    const callable = this.fns.httpsCallable<chType>('addNewChtype');
    return callable(chtype).toPromise();
  }
}
