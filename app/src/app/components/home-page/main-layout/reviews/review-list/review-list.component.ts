import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CulturalHeritage } from 'functions/src/models/culturalHeritage.model';
import { AddNewReviewComponent } from '../add-new-review/add-new-review.component';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public culturalHeritage: CulturalHeritage,
    public addNewDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.openAddDialog();
  }

  openAddDialog() {
    this.addNewDialog.open(AddNewReviewComponent, {
      width: '100%',
      maxWidth: '700px',
      data: this.culturalHeritage
    })
  }

}
