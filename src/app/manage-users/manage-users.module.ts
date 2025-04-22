import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ManageUsersComponent, UserFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ManageUsersComponent }]),
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ManageUsersModule {}