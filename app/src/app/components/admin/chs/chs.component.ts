import { Component, OnInit } from '@angular/core';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import {MatDialog} from '@angular/material/dialog';
import { AddNewChComponent } from './add-new-ch/add-new-ch.component';
import { CulturalHeritageService } from 'src/app/services/cultural-heritage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private culturalHeritageService: CulturalHeritageService,
    public addNewDialog: MatDialog, 
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.addNewDialog.open(AddNewChComponent, {
      width: '500px',
    })
    dialogRef.afterClosed().subscribe( async result => {
      if(result) {
        try{
          await this.culturalHeritageService.addNewCulturalHeritage(result);
          this.openSuccessSnackBar(`Successfully added ${result.name}`);
        }
        catch(error) {
          this.openFailSnackBar(error.message);
        }
      }
    })
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
      duration: 4000,
    });
  }
  openFailSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
    });
  }

}
