import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupporterComponent } from './supporter/supporter.component';
import { HeaderComponent } from './supporter/header/header.component';
import { FooterComponent } from './supporter/footer/footer.component';
import { SidebarComponent } from './supporter/sidebar/sidebar.component';
import { ActionComponent } from './core/component/action/action.component';
import { KpiallComponent } from './core/component/kpiall/kpiall.component';
import { MyprofileComponent } from './core/component/myprofile/myprofile.component';
import { FindlanddataComponent } from './core/component/findlanddata/findlanddata.component';
import { AcceptComponent } from './core/component/accept/accept.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';


import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RepairgroupComponent } from './core/component/repairgroup/repairgroup.component';
import { StockonlineComponent } from './core/component/stockonline/stockonline.component';
import { TestComponent } from './core/component/test/test.component';
import { PlantactionComponent } from './core/component/plantaction/plantaction.component';
import { PrbrdComponent } from './core/component/prbrd/prbrd.component';
import { GroupcutComponent } from './core/component/groupcut/groupcut.component';

import { DataTablesModule } from 'angular-datatables';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { ChartModule } from 'angular2-chartjs';
import { CreditComponent } from './core/component/credit/credit.component';
import { ManageareaComponent } from './core/component/managearea/managearea.component';
import { MatSortModule } from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import { DocforgroupcutComponent } from './core/component/docforgroupcut/docforgroupcut.component';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SupporterComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ActionComponent,
    KpiallComponent,
    MyprofileComponent,
    FindlanddataComponent,
    AcceptComponent,
    RepairgroupComponent,
    StockonlineComponent,
    TestComponent,
    PlantactionComponent,
    PrbrdComponent,
    GroupcutComponent,
    CreditComponent,
    ManageareaComponent,
    DocforgroupcutComponent,
  ],
  imports: [
    NgSelect2Module,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    NgxSpinnerModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAf9YahEjgiXdjEHY5q-MDJ-wsxAplvUMY',
      libraries: ['places', 'drawing', 'geometry'],
    }),
    DataTablesModule,
    ChartModule,
    MatExpansionModule

  ],
  exports: [MatIconModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
