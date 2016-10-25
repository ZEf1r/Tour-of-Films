import { Component } from '@angular/core';
import './rxjs-operators';
class model{
    constructor(
      public s: string,
      public type?: string,
      public y?: number
    ) { }
  };
@Component({
  selector: 'my-test',
  templateUrl: 'templates/search.html',
  styleUrls: [ 'styles/search.css' ]
})
export class SearchComponent{
  title = 'Tour of Films';
  public types = [
    { value: '', dsply: 'All', cls: 'radiobox-boing'},
    { value: 'movie', dsply: 'Movie', cls: 'radiobox-ufo'},
    { value: 'series', dsply: 'Series', cls: 'radiobox-focus'},
    { value: 'episode', dsply: 'Episode', cls: 'radiobox-scatman'}
  ];
  serh = new model('');
  submitted = false;
  onSubmit() { this.submitted = true}
  get diagnostic() {
    //console.log(this.serh.type);
    return JSON.stringify(this.serh)
  }
}
