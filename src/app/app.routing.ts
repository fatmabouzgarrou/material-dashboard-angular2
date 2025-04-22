import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'transactions', component: TransactionListComponent },
      { path: 'transaction-detail', component: TransactionDetailComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'manage-users', loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule) },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}