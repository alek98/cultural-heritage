import { Component, OnInit } from '@angular/core';
import { chType } from 'src/app/models/chType.model';

@Component({
  selector: 'app-chtypes',
  templateUrl: './chtypes.component.html',
  styleUrls: ['./chtypes.component.css']
})
export class ChtypesComponent implements OnInit {
  chtype: chType = {
    name: 'museum',
    description: 'an institution that cares for a collection of artifacts'
  }
  chtypes = [this.chtype];
  displayedColumns: string[] = ['name', 'description'];
  constructor() { }

  ngOnInit(): void {
  }

}
