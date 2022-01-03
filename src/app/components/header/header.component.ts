import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showNav: boolean = false;

  toggleNav(): void {
    this.showNav = !this.showNav;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
