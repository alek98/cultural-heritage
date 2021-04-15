import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { chType } from 'src/app/models/chType.model';
@Component({
  selector: 'app-edit-chtype',
  templateUrl: './edit-chtype.component.html',
  styleUrls: ['./edit-chtype.component.css']
})
export class EditChtypeComponent implements OnInit {

  descriptionFormControl = new FormControl('', [
    Validators.maxLength(100),
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: chType) { 
  }

  ngOnInit(): void {
  }

}
