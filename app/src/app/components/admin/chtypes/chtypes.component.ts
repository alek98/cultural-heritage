import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { chType } from 'src/app/models/chType.model';
import { AddNewChtypeComponent } from './add-new-chtype/add-new-chtype.component';

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
  constructor(
    public addNewDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.addNewDialog.open(AddNewChtypeComponent, {
      width: '500px',
    })
    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
    })
  }

}
