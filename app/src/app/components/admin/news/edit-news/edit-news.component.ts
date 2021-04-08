import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import { News } from 'src/app/models/news.model';
import { CulturalHeritageService } from 'src/app/services/cultural-heritage.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  culturalHeritages$: Observable<CulturalHeritage[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: News,
    private culturalHeritageService: CulturalHeritageService
  ) { }

  ngOnInit(): void {
    this.culturalHeritages$ = this.culturalHeritageService.getCulturalHeritages();
  }

}
