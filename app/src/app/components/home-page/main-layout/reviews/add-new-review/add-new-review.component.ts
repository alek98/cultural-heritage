import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CulturalHeritage } from 'functions/src/models/culturalHeritage.model';
import { Review } from 'src/app/models/review.model';
import { RatingComponent } from '../../rating/rating.component';
@Component({
  selector: 'app-add-new-review',
  templateUrl: './add-new-review.component.html',
  styleUrls: ['./add-new-review.component.css']
})
export class AddNewReviewComponent implements OnInit {

  @ViewChild(RatingComponent)
  ratingComponent: RatingComponent;

  newReview: Review = {
    rating: undefined,
    content: '',
    userDispalyName: '',
    chId: this.culturalHeritage.id,
  }
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public culturalHeritage: CulturalHeritage,
  ) { }

  ngOnInit(): void { }

  receiveRatingOutput(rating: number) {
    this.newReview.rating = rating;
  }
}
