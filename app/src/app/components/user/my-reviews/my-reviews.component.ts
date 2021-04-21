import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {

  reviews: Review[];

  constructor(
    private reviewService: ReviewService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(async user => {
      let reviews = await this.reviewService.getUserReviews(user);

      this.reviews = reviews.map(review => {
        let createdAtNotSerialized = review.createdAt as any;
        let createdAt = new firebase.firestore.Timestamp(
          createdAtNotSerialized._seconds,
          createdAtNotSerialized._nanoseconds
        )
        return { ...review, createdAt }
      });

      // console.log(this.reviews)
    })
  }
}
