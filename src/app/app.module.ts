import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
//import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { ComponentsModule } from './components/components.module';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    RouterModule,
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,  
    //AdminLayoutModule,
    AuthModule,
 ],
  declarations: [
    AppComponent,    
    AdminLayoutComponent,  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
