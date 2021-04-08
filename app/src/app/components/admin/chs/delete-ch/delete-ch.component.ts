import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';

@Component({
  selector: 'app-delete-ch',
  templateUrl: './delete-ch.component.html',
  styleUrls: ['./delete-ch.component.css']
})
export class DeleteChComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CulturalHeritage) { }

  ngOnInit(): void {
  }

}
