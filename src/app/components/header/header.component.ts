import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showNav: boolean = false;
  currentRoute: string = '';
  innerWidth: number = 0;

  constructor(private router: Router) {
      this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
              this.currentRoute = event.url;          
          }
      });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 1025) {
      this.showNav = true;
    }
    alert('styling in progress - some elements will not be properly sized or positioned');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 1025) {
      this.showNav = true;
    } else {
      this.showNav = false;
    }
  }

  toggleNav(): void {
    if (this.innerWidth < 1025) {
      this.showNav = !this.showNav;
    }
  }

}