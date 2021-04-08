import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { chType } from 'functions/src/models/chType.model';

@Component({
  selector: 'app-delete-chtype',
  templateUrl: './delete-chtype.component.html',
  styleUrls: ['./delete-chtype.component.css']
})
export class DeleteChtypeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: chType) { }

  ngOnInit(): void { }

}
