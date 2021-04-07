import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
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
    private newsService: NewsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddNewsComponent, {
      width: '500px',
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try{
          await this.newsService.addNews(result);
          this.openSuccessSnackBar(`Successfully added ${result.name}`);
        }
        catch (error) {
          this.openFailSnackBar(error.message);
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