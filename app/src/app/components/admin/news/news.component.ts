import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news.model';

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
  constructor() { }

  ngOnInit(): void {
  }

  openEditDialog(news: News) {

  }

  openDeleteDialog(news: News) {

  }

}
