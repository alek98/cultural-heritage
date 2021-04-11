import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit {
  breakpoint: number;

  constructor() { }

  ngOnInit() {
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
