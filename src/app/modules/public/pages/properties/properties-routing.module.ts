import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglePropertyComponent } from './components/single-property/single-property.component';
import { PropertiesComponent } from './properties.component';

const routes: Routes = [
  {
    path : '',
    component: PropertiesComponent
  },
  {
    path : ':id',
    component: SinglePropertyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
