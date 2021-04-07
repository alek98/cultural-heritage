import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import { News } from 'src/app/models/news.model';
import { CulturalHeritageService } from 'src/app/services/cultural-heritage.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  news: News = {
    heading: '',
    content: '',
    chName: ''
  }

  culturalHeritages$: Observable<CulturalHeritage[]>;
  
  constructor (private culturalHeritageService: CulturalHeritageService) { }

  ngOnInit(): void {
    this.culturalHeritages$ = this.culturalHeritageService.getCulturalHeritages();
  }

}
