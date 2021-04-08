import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
import { AddNewsComponent } from './add-news/add-news.component';
import { DeleteNewsComponent } from './delete-news/delete-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';

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
  displayedColumns: string[] = ['heading', 'content', 'chName', 'lastModified', 'edit', 'delete'];
  
  news$: Observable<News[]>;

  constructor(
    private newsService: NewsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.news$ = this.newsService.getNews();
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

  openEditDialog(selected: News) {
    const dialogRef = this.dialog
      .open<EditNewsComponent, any, News>(EditNewsComponent, {
        width: '500px',
        data: {...selected}
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        console.log(result);
        try{
          await this.newsService.editNews(result);
          this.openSuccessSnackBar(`Successfully updated ${result.heading}`);
        }
        catch (error) {
          this.openFailSnackBar(error.message)
        }
      }
    })
  }

  openDeleteDialog(selected: News) {
    const dialogRef = this.dialog.open(DeleteNewsComponent, {
      width: '500px',
      data: {...selected}
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(result) {
        try {
          await this.newsService.deleteNews(result);
          this.openSuccessSnackBar(`Successfully deleted ${result.heading}`);
        } catch (error) {
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
