import { Component, OnInit } from '@angular/core';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';

@Component({
  selector: 'app-chs',
  templateUrl: './chs.component.html',
  styleUrls: ['./chs.component.css']
})
export class ChsComponent implements OnInit {
  ch : CulturalHeritage = {
    name: 'museum of Novi Sad',
    chtype: {
      name: 'museum',
      description: ' is an institution that cares for a collection of artifacts'
    },
    description: 'the best museum in the world',
    avgRating: 0,
    location: {
      city: 'Novi Sad',
      street: 'Zmaj Jovina',
      country: 'Serbia',
      geopoint: {
        latitude: 0,
        longitude: 0,
      }
    },
  }
  culturalHeritages = [this.ch ];
  displayedColumns: string[] = ['name', 'chtype', 'description', 'location'];
  constructor() { }

  ngOnInit(): void {
  }

}
