import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import { CulturalHeritageService } from 'src/app/services/cultural-heritage.service';
import { ReviewListComponent } from '../reviews/review-list/review-list.component';

@Component({
  selector: 'app-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.css']
})
export class ListLayoutComponent implements OnInit {
  culturalHeritages$: Observable<CulturalHeritage[]>;

  constructor(
    private culturalHeritageService: CulturalHeritageService,
    public reviewsDialog: MatDialog,
  ) { }

  ngOnInit():void {
    this.culturalHeritages$ = this.culturalHeritageService.getCulturalHeritages();
    this.culturalHeritages$.subscribe( chs => { 
      this.openReviews(chs.filter( ch => ch.name == "Acropolis")[0])
    })
  }

  openReviews(selected: CulturalHeritage) {
    const dialogRef = this.reviewsDialog.open( ReviewListComponent, {
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: selected
    })
  }

}
