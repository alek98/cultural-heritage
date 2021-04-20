import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {

  constructor(
    private reviewService: ReviewService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(async user => {
      let myReviews = await this.reviewService.getUserReviews(user);
      console.log(myReviews)
    })
  }
}
