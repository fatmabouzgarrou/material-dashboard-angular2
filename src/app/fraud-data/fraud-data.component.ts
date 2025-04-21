import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-fraud-data',
  templateUrl: './fraud-data.component.html',
  styleUrls: ['./fraud-data.component.scss']
})
export class FraudDataComponent implements OnInit {
  data = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getFraudData().subscribe({
      next: (response) => this.data = response,
      error: (err) => console.error('Error fetching fraud data:', err)
    });
  }
}