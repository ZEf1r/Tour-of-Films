import { HttpModule } from '@angular/http';
import {SearchComponent} from './search.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    SearchComponent
  ],
  bootstrap: [ SearchComponent ]
})
export class AppModule { }
