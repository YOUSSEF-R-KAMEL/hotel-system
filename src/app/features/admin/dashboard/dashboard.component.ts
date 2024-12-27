import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isExpand: boolean = true;
  toggleSidebar(): void {
    this.isExpand = !this.isExpand;
  }
}
