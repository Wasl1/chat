import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateChannelComponent } from './components/create-channel/create-channel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'create-channel',
    component: CreateChannelComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
