import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CulturalHeritage } from 'functions/src/models/culturalHeritage.model';
import { Review } from 'src/app/models/review.model';
@Component({
  selector: 'app-add-new-review',
  templateUrl: './add-new-review.component.html',
  styleUrls: ['./add-new-review.component.css']
})
export class AddNewReviewComponent implements OnInit {

  newReview: Review = {
    rating: 0,
    content: '',
    userDispalyName: ''
  }
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public culturalHeritage: CulturalHeritage,
  ) { }

  ngOnInit(): void {
  }

}
