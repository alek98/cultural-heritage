import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Review) { }

  ngOnInit(): void {
  }

  contentFormControl = new FormControl('', [
    Validators.maxLength(700),
  ]);

  receiveRatingOutput(rating: number) {
    this.data.rating = rating;
  }

}
