import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];
  dataSource: User[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshUsers();
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: { id: 0, username: '', email: '', role: '', password: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addUser(result).subscribe({
          next: () => this.refreshUsers(),
          error: (err) => alert('Error adding user: ' + err.message)
        });
      }
    });
  }

  openUpdateUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe({
          next: () => this.refreshUsers(),
          error: (err) => alert('Error updating user: ' + err.message)
        });
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.refreshUsers(),
        error: (err) => alert('Error deleting user: ' + err.message)
      });
    }
  }

  private refreshUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.dataSource = users,
      error: (err) => alert('Error loading users: ' + err.message)
    });
  }
}