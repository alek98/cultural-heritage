import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { CulturalHeritage } from '../models/culturalHeritage.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CulturalHeritageService {

  constructor(
    private fns: AngularFireFunctions,
    private firestore: AngularFirestore,
  ) { }

  addNewCulturalHeritage(ch: CulturalHeritage) {
    const callable = this.fns.httpsCallable<CulturalHeritage>('addNewCulturalHeritage');
    const obs = callable(ch).toPromise();
    return obs;
  }

  getCulturalHeritages() {
    // get items only one time
    // let itemsCollection =
    // await this.firestore.collection('culturalHeritages').get().toPromise();
    // itemsCollection.forEach(doc => console.log(doc.data()))

    // get chs as observable
    let itemsCollection = this.firestore.collection<CulturalHeritage>('culturalHeritages');
    return itemsCollection.valueChanges();
  }

  editCulturalHeritage(culturalHeritage: CulturalHeritage) {
    const callable = this.fns.httpsCallable<CulturalHeritage>('editCulturalHeritage');
    return callable(culturalHeritage).toPromise();
  }
}
