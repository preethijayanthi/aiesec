import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './opportunities/home/home.component';
import { DetailsComponent } from './opportunities/details/details.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, data: { title: 'Home' }},
    { path: 'opportunities/:id', component: DetailsComponent, data: { title: 'Opportunity Details' }}
];
export const routers = RouterModule.forRoot(appRoutes);
