import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { chType } from 'src/app/models/chType.model';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import { ChtypeService } from 'src/app/services/chtype.service';
@Component({
  selector: 'app-edit-ch',
  templateUrl: './edit-ch.component.html',
  styleUrls: ['./edit-ch.component.css']
})
export class EditChComponent implements OnInit {

  chtypes$: Observable<chType[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CulturalHeritage,
    private chtypeService: ChtypeService) { }
  
  ngOnInit(): void {
    this.chtypes$ = this.chtypeService.getChtypes();
  }

}
