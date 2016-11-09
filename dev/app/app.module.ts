import { RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { HttpModule } from '@angular/http';
import { SearchComponent } from './search.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { FilmDetailComponent } from './film-detail.component';
import { ListService } from './list.service';
import { AppComponent } from './app.component';
@NgModule({
  imports: [
    InfiniteScrollModule,
    BrowserModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/search',
        pathMatch: 'full'
      },
      {
        path: 'detail/:id',
        component: FilmDetailComponent
      },
      {
        path: 'search',
        component: SearchComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    FilmDetailComponent,
    ListComponent
  ],
  providers: [
    ListService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
