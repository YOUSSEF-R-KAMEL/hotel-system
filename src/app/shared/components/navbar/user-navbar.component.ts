import { Component } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.scss'
})
export class UserNavbarComponent {
  isLoggedIn = true;
  constructor() { }
  navLinks = [
    { text: 'Home', path: '', isActive: true },
    { text: 'Explore', path: 'explore', isActive: true },
    { text: 'Reviews', path: 'reviews', isActive: true },
    { text: 'Favorites', path: 'favs', isActive: true },
  ]
}
