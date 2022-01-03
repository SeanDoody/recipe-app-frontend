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
  spinWheel: boolean = false;

  newSearch(): void {

    this.spinWheel = true;

    const newEvent: SearchEvent = {
      keywords: this.keywords,
      dishType: this.dishType,
      dietaryRestrictions: this.dietaryRestrictions
    };

    setTimeout(() => {
      this.newSearchEvent.emit(newEvent);
      console.log('emitted:');
      console.log(newEvent);
    }, 1000);

    setTimeout(() => {
      this.spinWheel = false;
    }, 1000);

  }

  constructor() { }

  ngOnInit(): void {
  }

}

// style icons PNG Designed By Ylivdesign from https://pngtree.com/freepng/casino-gambling-roulette-icon-flat-style_5252282.html?sol=downref&id=bef
// <a href='https://pngtree.com/so/casino'>casino png from pngtree.com/</a>