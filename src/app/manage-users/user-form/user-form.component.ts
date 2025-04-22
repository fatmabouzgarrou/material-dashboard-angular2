import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;
  roles = ['ADMIN', 'USER']; // Adjust based on your backend roles

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.userForm = this.fb.group({
      id: [data.id],
      username: [data.username, [Validators.required, Validators.minLength(3)]],
      email: [data.email, [Validators.required, Validators.email]],
      role: [data.role, Validators.required],
      password: [data.id ? null : ['', [Validators.required, Validators.minLength(6)]], data.id ? [] : [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}