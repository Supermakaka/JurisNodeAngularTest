import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwitterComponent } from './twitter/twitter.component';
import { TwitterService } from './services/twitter.service';

const routes: Routes = [
  { path: '', component: TwitterComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
