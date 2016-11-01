import { ListComponent } from './list.component';
import { HttpModule } from '@angular/http';
import {SearchComponent} from './search.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
@NgModule({
  imports: [
    InfiniteScrollModule,
    BrowserModule,
    HttpModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    SearchComponent,
    ListComponent
  ],
  bootstrap: [ SearchComponent ]
})
export class AppModule { }
