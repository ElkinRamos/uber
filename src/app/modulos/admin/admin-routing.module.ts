import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './usuarios/create/create.component';
import { EditComponent } from './usuarios/edit/edit.component';
import { GetComponent } from './usuarios/get/get.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    //canActivate: [SessionGuard]
  },{
    path: 'edit/:id',
    component: EditComponent,
//    canActivate: [SessionGuard]
  },{
    path: 'get',
    component: GetComponent,
  },{
    path: '',
    //    path: 'get',
//component: GetComponent,
    redirectTo: 'get'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
