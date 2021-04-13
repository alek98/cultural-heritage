import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import { CulturalHeritageService } from 'src/app/services/cultural-heritage.service';

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit {
  breakpoint: number;
  culturalHeritages$: Observable<CulturalHeritage[]>;

  constructor(
    private culturalHeritageService: CulturalHeritageService,
  ) { }

  ngOnInit() {
    this.culturalHeritages$ = this.culturalHeritageService.getCulturalHeritages();
    this.breakpoint = this.getColumns();
  }

  onResize(event) {
    this.breakpoint = this.getColumns();
  }

  getColumns(){
    if(window.innerWidth < 800 ) return 2;
    else return 3;
  }

}
