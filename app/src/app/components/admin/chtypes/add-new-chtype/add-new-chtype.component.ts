import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { chType } from 'src/app/models/chType.model';

@Component({
  selector: 'app-add-new-chtype',
  templateUrl: './add-new-chtype.component.html',
  styleUrls: ['./add-new-chtype.component.css']
})
export class AddNewChtypeComponent implements OnInit {
  newChtype: chType = {
    name: '',
    description: '',
  }

  descriptionFormControl = new FormControl('', [
    Validators.maxLength(100),
  ]);
  constructor() { }

  ngOnInit(): void {
  }

}
