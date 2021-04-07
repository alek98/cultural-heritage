import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { News } from 'src/app/models/news.model';
import { AddNewsComponent } from './add-news/add-news.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  dummyNews: News = {
    heading: 'New Destination: Mont-Saint-Michel.',
    content: 'his complex exemplifies the outstanding universal values upheld by UNESCO.',
    chName: 'Mont-Saint-Michel'
  }
  displayedColumns: string[] = ['heading', 'content', 'chName', 'edit', 'delete'];
  
  news$ = [this.dummyNews];
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddNewsComponent, {
      width: '500px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try{
          
          console.log(result);
        }
        catch (error) {

        }
      }
    })

  }

  openEditDialog(news: News) {

  }

  openDeleteDialog(news: News) {

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
