import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule',
  canActivate: [AuthGuard]
}, {
  path: '',
  redirectTo: '/auth/login',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
