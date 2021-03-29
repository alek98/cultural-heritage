import { Component, OnInit } from '@angular/core';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import {MatDialog} from '@angular/material/dialog';
import { AddNewChComponent } from './add-new-ch/add-new-ch.component';

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
    },
  }
  culturalHeritages = [this.ch ];
  displayedColumns: string[] = ['name', 'chtype', 'description', 'location'];
  
  constructor(
    public addNewDialog: MatDialog, 
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.addNewDialog.open(AddNewChComponent, {
      width: '500px',
    })
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
    })
  }

}
