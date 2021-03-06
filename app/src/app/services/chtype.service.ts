import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { chType } from 'functions/src/models/chType.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChtypeService {

  constructor(
    private fns: AngularFireFunctions,
    private firestore: AngularFirestore,
  ) { }

  addNewChtype(chtype: chType) {
    const callable = this.fns.httpsCallable<chType>('addNewChtype');
    return callable(chtype).toPromise();
  }

  getChtypes() {
    // this way I can get documentId
    let itemsCollection = this.firestore.collection<chType>('culturalHeritageTypes');
    return itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as chType;
        const id = a.payload.doc.id;
        data.id = id;
        return data;
      }))
    )
  }

  editChtype(chtype: chType) {
    const callable = this.fns.httpsCallable<chType>('editChtype');
    return callable(chtype).toPromise();
  }

  deleteChtype(chtype: chType) {
    const callable = this.fns.httpsCallable<chType>('deleteChtype');
    return callable(chtype).toPromise();
  }
}
