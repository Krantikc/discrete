import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}, {
  path: 'auth',
  loadChildren: () => import('app/auth/auth.module').then(m => m.AuthModule)
}, {
  path: 'admin',
  loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule),
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
