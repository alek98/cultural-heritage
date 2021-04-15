import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { chType } from 'src/app/models/chType.model';
import { CulturalHeritage } from 'src/app/models/culturalHeritage.model';
import { ChtypeService } from 'src/app/services/chtype.service';

@Component({
  selector: 'app-add-new-ch',
  templateUrl: './add-new-ch.component.html',
  styleUrls: ['./add-new-ch.component.css']
})
export class AddNewChComponent implements OnInit {
  newCulturalHeritage: CulturalHeritage = {
    name: '',
    chtype: {
      name: '',
      description: ''
    },
    description: '',
    avgRating: 0,
    location: {
      city: '',
      street: '',
      country: '',
    },
  }
  chtypes$: Observable<chType[]>;

  descriptionFormControl = new FormControl('', [
    Validators.maxLength(700),
  ]);

  constructor(
    private chtypeService: ChtypeService,
  ) { }

  ngOnInit(): void {
    this.chtypes$ = this.chtypeService.getChtypes();
  }

}
