import { Component, OnInit } from '@angular/core';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import { MatDialog } from '@angular/material/dialog';
import { AddNewChComponent } from './add-new-ch/add-new-ch.component';
import { CulturalHeritageService } from 'src/app/services/cultural-heritage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EditChComponent } from './edit-ch/edit-ch.component';
import { DeleteChComponent } from './delete-ch/delete-ch.component';

@Component({
  selector: 'app-chs',
  templateUrl: './chs.component.html',
  styleUrls: ['./chs.component.css']
})
export class ChsComponent implements OnInit {
  ch: CulturalHeritage = {
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

  culturalHeritages$: Observable<CulturalHeritage[]>;
  displayedColumns: string[] = ['name', 'chtype', 'description', 'location', 'edit', 'delete'];

  constructor(
    private culturalHeritageService: CulturalHeritageService,
    public addNewDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.culturalHeritages$ = this.culturalHeritageService.getCulturalHeritages();
  }

  openDialog() {
    const dialogRef = this.addNewDialog
      .open<AddNewChComponent, any, CulturalHeritage>(AddNewChComponent, {
        width: '500px',
      });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          delete result.chtype.id;
          await this.culturalHeritageService.addNewCulturalHeritage(result);
          this.openSuccessSnackBar(`Successfully added ${result.name}`);
        }
        catch (error) {
          this.openFailSnackBar(error.message);
        }
      }
    })
  }

  openEditDialog(selected: CulturalHeritage) {
    const dialogRef = this.addNewDialog
      .open<EditChComponent, any , CulturalHeritage>( EditChComponent, {
        width: '500px',
        data: {...selected, chtype: {...selected.chtype}} // deep copy object
      });

    dialogRef.afterClosed().subscribe(async result => {
      if(result) {
        try {
          delete result.chtype.id;
          await this.culturalHeritageService.editCulturalHeritage(result);
          this.openSuccessSnackBar(`Successfully updated ${result.name}`);
        } catch (error) {
          this.openFailSnackBar(error.message);
        }
      }
    })
  }

  openDeleteDialog(selected: CulturalHeritage) {
    const dialogRef = this.addNewDialog.open( DeleteChComponent, {
      width: '500px',
      data: {...selected, chtype: {...selected.chtype}}
    })

    dialogRef.afterClosed().subscribe( async result => {
      if (result) {
        try{
          await this.culturalHeritageService.deleteCulturalHeritage(result);
          this.openSuccessSnackBar(`Successfully deleted ${result.name}`);
        }
        catch (error) {
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
