import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import firebase from 'firebase/app';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditReviewComponent } from '../edit-review/edit-review.component';

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
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
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

      console.log(this.reviews)
    })
  }

  openEditDialog(selected: Review) {
    const dialogRef = this.dialog.open(EditReviewComponent, {
      width: '100%',
      maxWidth: '700px',
      data: {...selected}
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        try {
          console.log(result);
          await this.reviewService.editReview(result);
          this.openSuccessSnackBar(`Successfully edited review.`);
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
