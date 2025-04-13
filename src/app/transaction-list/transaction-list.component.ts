import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transaction } from '../models/transaction';
import { TransactionService } from 'app/services/TransactionService/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  filterForm: FormGroup;
  transactions: Transaction[] = [];
  public trx:any;
  filteredTransactions: Transaction[] = [];

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.filterForm = this.fb.group({
      startDate: [null],
      endDate: [null],
      minAmount: [null],
      maxAmount: [null],
      country: [''],
      status: ['']
    });
  }

  ngOnInit() {
    console.log('ngOnInit appelé - Début du chargement des transactions');
    this.loadTransactions();
  }

  loadTransactions() {
    console.log('loadTransactions appelé - Appel de l\'API...');
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        console.log('Données transformées reçues:', data);
        //if (data && Array.isArray(data)) {
          console.log('Transactions assignées: fffff', data);
          this.transactions = data;
          this.filteredTransactions = data;
          this.trx = data;
          console.log('Transactions assignées:', this.transactions);
          console.log('Filtered Transactions assignées:', this.filteredTransactions);
        /*} else {
          console.warn('Aucune donnée valide reçue ou données non conformes:', data);
          this.transactions = [];
          this.filteredTransactions = [];
        }*/
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des transactions:', err);
        this.transactions = [];
        this.filteredTransactions = [];
      },
      complete: () => {
        console.log('Récupération des transactions terminée.');
      }
    });
  }

  applyFilters() {
    const filters = this.filterForm.value;
    console.log('Filtres appliqués:', filters);
    this.filteredTransactions = this.transactions.filter(t => {
      return (
        (!filters.startDate || new Date(t.openDate) >= new Date(filters.startDate)) &&
        (!filters.endDate || new Date(t.openDate) <= new Date(filters.endDate)) &&
        (!filters.minAmount || t.totalAmount >= filters.minAmount) &&
        (!filters.maxAmount || t.totalAmount <= filters.maxAmount) &&
        (!filters.status || t.status === filters.status)
      );
    });
    console.log('Filtered Transactions après filtrage:', this.filteredTransactions);
  }

  getRiskClass(riskLevel: string | undefined): string {
    if (!riskLevel) return '';
    switch (riskLevel) {
      case 'High': return 'alert-high';
      case 'Medium': return 'alert-medium';
      case 'Low': return 'alert-low';
      default: return '';
    }
  }

  getTooltipText(transaction: Transaction): string {
    const riskLevel = transaction.riskLevel || 'Low';
    switch (riskLevel) {
      case 'High': return 'Suspicion de fraude : montant inhabituel';
      case 'Medium': return 'Attention : transaction à vérifier';
      case 'Low': return 'Transaction normale';
      default: return '';
    }
  }
}