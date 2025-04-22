import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { TransactionListComponent } from 'app/transaction-list/transaction-list.component';
import { ManageUsersComponent } from 'app/manage-users/manage-users.component';

export const AdminLayoutRoutes: Routes = [
     {
       path: '',
       children: [ {
         path: 'dashboard',
         component: DashboardComponent
     }]}, {
     path: '',
     children: [ {
       path: 'userprofile',
       component: UserProfileComponent
     }] }, {
       path: '',
       children: [ {
         path: 'icons',
         component: IconsComponent
         }]
     }, {
         path: '',
         children: [ {
             path: 'notifications',
             component: NotificationsComponent
         }]
     },  
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'transaction-list', component: TransactionListComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'manage-users', loadChildren: () => import('../../manage-users/manage-users.module').then(m => m.ManageUsersModule) }
];