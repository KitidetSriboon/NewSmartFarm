import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { SupporterComponent } from './supporter/supporter.component';
import { ActionComponent } from './core/component/action/action.component';
import { KpiallComponent } from './core/component/kpiall/kpiall.component';
import { FindlanddataComponent } from './core/component/findlanddata/findlanddata.component';
import { AcceptComponent } from './core/component/accept/accept.component';
import { MyprofileComponent } from './core/component/myprofile/myprofile.component';
import { RepairgroupComponent } from './core/component/repairgroup/repairgroup.component';
import { StockonlineComponent } from './core/component/stockonline/stockonline.component';
import { PlantactionComponent } from './core/component/plantaction/plantaction.component';
import { PrbrdComponent } from './core/component/prbrd/prbrd.component';
import { GroupcutComponent } from './core/component/groupcut/groupcut.component';
import { CreditComponent } from './core/component/credit/credit.component';
import { ManageareaComponent } from './core/component/managearea/managearea.component';
import { DocforgroupcutComponent } from './core/component/docforgroupcut/docforgroupcut.component';



const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'supporter', component: SupporterComponent, 
    children:[
      { path:'action6464', component: ActionComponent },
      { path:'kpiall', component: KpiallComponent },
      { path:'findlanddata', component: FindlanddataComponent },
      { path:'accept', component: AcceptComponent },
      { path:'myprofile', component: MyprofileComponent},
      { path:'repairgroup', component: RepairgroupComponent},
      { path:'stockonline', component: StockonlineComponent},
      { path:'plantaction', component: PlantactionComponent},
      { path:'prbrd', component: PrbrdComponent },
      { path:'groupcup', component: GroupcutComponent },
      { path:'credit', component: CreditComponent },
      { path:'managearea', component:ManageareaComponent},
      { path:'docforgroupcut', component:DocforgroupcutComponent}
    ]
  },
 
  // { path: 'supporter', loadChildren: './app.module#AppModule' },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: "enabled",
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: "enabled",
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
