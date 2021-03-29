import { Component, OnInit } from '@angular/core';
import { chType } from 'src/app/models/chType.model';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';

@Component({
  selector: 'app-add-new-ch',
  templateUrl: './add-new-ch.component.html',
  styleUrls: ['./add-new-ch.component.css']
})
export class AddNewChComponent implements OnInit {
  newCulturalHeritage : CulturalHeritage = {
    name: '',
    chtype: {
      name: '',
      description: ''
    },
    description: '',
    avgRating: 0,
    location: {
      city: '',
      street: '',
      country: '',
    },
  }

  type1: chType = {
    name: 'museum',
    description: 'an institution that cares for a collection of artifacts'
  }
  type2: chType = {
    name: 'library',
    description: 'a collection of literary materials'
  }
  chtypes = [ this.type1, this.type2];


  constructor() { }

  ngOnInit(): void {
  }

}
