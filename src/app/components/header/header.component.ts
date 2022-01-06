import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showNav: boolean = false;
  activeRoute: string = '';

  toggleNav(): void {
    this.activeRoute = this.router.url;
    this.showNav = !this.showNav;
    console.log('called toggleNav');
    console.log('route:')
    console.log(this.activeRoute);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

}