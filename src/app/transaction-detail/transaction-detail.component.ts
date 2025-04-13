import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent {
  @Input() transaction: any; // Recevoir la transaction sélectionnée depuis un parent
}