
// First, AppRoutingModule imports RouterModule and Routes so the app can have routing functionality. The next import, HeroesComponent, will give the Router somewhere to go once you config the routes. 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from "./heroes/heroes.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; /* Routes the user to the HeroDetailComponent page when that specific hero is clicked on */

/* 
  This is where you configure your routes. Routes tell the ROuter which view to display when a user clicks on a link or pastes a URL into the browser address bar. A typical Angular route has two properties: 
    path: a string that matches the URL in the browser address bar.
    component: the component that the router should create when navigating to this route.
*/
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }, /* This tells router to match that URL to path: 'heroes' and display the HeroesComponent when the URL is somehting like localhost:4200/heroes. */
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard',pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent}
]; 

/* The @NgModule metadata initialzes the routeer and starts listening for browser location changes. 
The following line adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot(). The method is called forRoot() because you config the router at the applications root level. The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
