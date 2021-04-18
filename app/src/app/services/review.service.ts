import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Review } from '../models/review.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private fns: AngularFireFunctions,
    private firestore: AngularFirestore
  ) { }

  addNewReview(review: Review) {
    const callable = this.fns.httpsCallable<Review>('addNewReview');
    return callable(review).toPromise();
  }

  getReviews(chId: string) {
    let itemsCollection = this.firestore.collection<Review>(`culturalHeritages/${chId}/reviews`);
    return itemsCollection.snapshotChanges().pipe(
      map (actions => actions.map (a => {
        const data = a.payload.doc.data() as Review;
        const id = a.payload.doc.id;
        data.id = id;
        return data;
      }))
    )
  }
}
