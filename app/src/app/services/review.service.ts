import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private fns: AngularFireFunctions,
    private firestore: AngularFirestore
  ) { }

  addNewReview(review: Review) {
    const callable = this.fns.httpsCallable<Review>('addReview');
    return callable(review).toPromise();
  }
}
