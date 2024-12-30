import { Component, EventEmitter, Output } from '@angular/core';

interface IMenu {
  name: string;
  icon: string;
  route: string;
}
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss',
})
export class SideNavbarComponent {
  isExpanded: boolean = true;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  navItems: IMenu[] = [
    {
      name: 'Home',
      icon: 'home',
      route: '/admin/dashboard/home',
    },
    {
      name: 'Users',
      icon: 'people',
      route: '/admin/dashboard/users',
    },
    {
      name: 'Facilities',
      icon: 'people',
      route: '/admin/dashboard/facilities',
    },
    {
      name: 'Rooms',
      icon: 'task',
      route: '/admin/dashboard/rooms',
    },
    {
      name: 'Ads',
      icon: 'work',
      route: '/admin/dashboard/ads',
    },
    {
      route: '/booking',
      name: 'Booking facilities',
      icon: 'lock_open',
    },
  ];
  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.toggle.emit();
  }
}
