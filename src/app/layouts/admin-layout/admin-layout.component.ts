import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  template: `
    
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  ngOnInit() {
    console.log('AdminLayoutComponent loaded');
  }
}