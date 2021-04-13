import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import { CulturalHeritageService } from 'src/app/services/cultural-heritage.service';

@Component({
  selector: 'app-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.css']
})
export class ListLayoutComponent implements OnInit {
  culturalHeritages$: Observable<CulturalHeritage[]>;

  constructor(
    private culturalHeritageService: CulturalHeritageService,
  ) { }

  ngOnInit(): void {
    this.culturalHeritages$ = this.culturalHeritageService.getCulturalHeritages();
  }

}
