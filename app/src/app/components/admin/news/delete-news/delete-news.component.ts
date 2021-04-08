import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from 'functions/src/models/news.model';

@Component({
  selector: 'app-delete-news',
  templateUrl: './delete-news.component.html',
  styleUrls: ['./delete-news.component.css']
})
export class DeleteNewsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: News) { }

  ngOnInit(): void {
  }

}
