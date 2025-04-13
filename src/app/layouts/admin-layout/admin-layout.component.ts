import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  toggleSidebar() {
    // Toggle sidebar for mobile view (Creative Tim feature)
    document.querySelector('.sidebar')?.classList.toggle('active');
  }
}