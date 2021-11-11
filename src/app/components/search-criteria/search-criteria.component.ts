import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchEvent } from 'src/app/models/search-event';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

  @Output() newSearchEvent = new EventEmitter<SearchEvent>();

  keywords: string = "";
  dishType: string[] = [];
  dietaryRestrictions: string[] = [];

  newSearch(): void {
    const newEvent: SearchEvent = {
      keywords: this.keywords,
      dishType: this.dishType,
      dietaryRestrictions: this.dietaryRestrictions
    };
    this.newSearchEvent.emit(newEvent);
    console.log("emitted:");
    console.log(newEvent);
  }

  constructor() { }

  ngOnInit(): void {
  }

}