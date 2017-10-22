import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {MatSelectModule ,MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServicesComponent } from './components/services/services.component';
import { BuyleadsComponent } from './components/buyleads/buyleads.component';
import { ContactsComponent } from './components/contacts/contacts.component';

//Service imports
import { DataService } from './shared/data.service';


const appRoutes: Routes = [
  { path: 'buyleads', component: BuyleadsComponent },
  { path: 'home', component: HeaderComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    AboutComponent,
    FooterComponent,
    ServicesComponent,
    BuyleadsComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule.forRoot(
      appRoutes 
    )
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
