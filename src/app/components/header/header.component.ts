import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  showNav: boolean = false;
  currentRoute: string = '';
  innerWidth: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 1024) {
      this.showNav = true;
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if (this.currentRoute === '/') {
          this.currentRoute = '/search';
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 1024) {
      this.showNav = true;
    } else {
      this.showNav = false;
    }
  }

  toggleNav(): void {
    if (this.innerWidth < 1024) {
      this.showNav = !this.showNav;
    }
  }
}
