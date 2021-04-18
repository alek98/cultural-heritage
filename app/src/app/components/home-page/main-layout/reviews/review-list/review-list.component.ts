import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CulturalHeritage } from 'functions/src/models/culturalHeritage.model';
import { ReviewService } from 'src/app/services/review.service';
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
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.openAddDialog();
  }

  openAddDialog() {
    const dialogRef = this.addNewDialog.open(AddNewReviewComponent, {
      width: '100%',
      maxWidth: '700px',
      data: this.culturalHeritage
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try{
          await this.reviewService.addNewReview(result);
          this.openSuccessSnackBar(`Successfully added new review.`);
        }
        catch (error) {
          this.openFailSnackBar(error.message);
        }
      }
    })
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
      duration: 4000,
    });
  }
  openFailSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
    });
  }

}
