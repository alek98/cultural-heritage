import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { CulturalHeritage } from '../models/culturalHeritage.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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
    let itemsCollection = this.firestore.collection<CulturalHeritage>('culturalHeritages');
    return itemsCollection.snapshotChanges().pipe(
      map (actions => actions.map (a => {
        const data = a.payload.doc.data() as CulturalHeritage;
        const id = a.payload.doc.id;
        data.id = id;
        return data;
      }))
    )
  }

  editCulturalHeritage(culturalHeritage: CulturalHeritage) {
    const callable = this.fns.httpsCallable<CulturalHeritage>('editCulturalHeritage');
    return callable(culturalHeritage).toPromise();
  }

  deleteCulturalHeritage (culturalHeritage: CulturalHeritage) {
    const callable = this.fns.httpsCallable<CulturalHeritage>('deleteCutluralHeritage');
    return callable(culturalHeritage).toPromise();
  }
}
