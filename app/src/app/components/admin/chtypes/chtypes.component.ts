import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { chType } from 'src/app/models/chType.model';
import { ChtypeService } from 'src/app/services/chtype.service';
import { AddNewChtypeComponent } from './add-new-chtype/add-new-chtype.component';

@Component({
  selector: 'app-chtypes',
  templateUrl: './chtypes.component.html',
  styleUrls: ['./chtypes.component.css']
})
export class ChtypesComponent implements OnInit {
  
  chtypes$: Observable<chType[]>;
  displayedColumns: string[] = ['name', 'description'];
  constructor(
    private chtypeService: ChtypeService,
    public addNewDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.chtypes$ = this.chtypeService.getChtypes();
  }

  openDialog() {
    const dialogRef = this.addNewDialog.open(AddNewChtypeComponent, {
      width: '500px',
    })
    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        try {
          await this.chtypeService.addNewChtype(result);
          this.openSuccessSnackBar(`Successfully added ${result.name}`); 
        } catch (error) {
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
