import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-my-news',
  templateUrl: './my-news.component.html',
  styleUrls: ['./my-news.component.css']
})
export class MyNewsComponent implements OnInit {

  news$: Observable<News[]>;
  
  constructor(
    private newsService: NewsService,
  ) { }

  ngOnInit(): void {
    this.news$ = this.newsService.getNews();
  }

}
