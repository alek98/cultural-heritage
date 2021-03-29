import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { CulturalHeritage } from '../models/culturalHeritage.model';

@Injectable({
  providedIn: 'root'
})
export class CulturalHeritageService {

  constructor(
    private fns: AngularFireFunctions,
  ) { }

  addNewCulturalHeritage(ch: CulturalHeritage) {
    const callable = this.fns.httpsCallable<CulturalHeritage>('addNewCulturalHeritage');
    const obs = callable(ch).toPromise();
    return obs;
  }
}
