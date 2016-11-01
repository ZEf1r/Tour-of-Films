import { Component, OnInit } from '@angular/core';
import { Srchstrng } from "./srchstrng";
import { ListService } from './list.service';
import { Lof } from './lof.interface';

@Component({
	selector: 'my-test',
	templateUrl: 'templates/search.html',
	providers: [ListService]
})
export class SearchComponent {
	title = 'Tour of Films';
	private submitted = false;
	//errorMessage: string;
	errmsg: any;
	films: Lof[];
	fndResult: number;
	constructor(private listService: ListService) { }
	private serh: Srchstrng;
	private search: Srchstrng;
	private types = [
		{ value: '', dsply: 'All', cls: 'radiobox-boing' },
		{ value: 'movie', dsply: 'Movie', cls: 'radiobox-ufo' },
		{ value: 'series', dsply: 'Series', cls: 'radiobox-focus' },
		{ value: 'episode', dsply: 'Episode', cls: 'radiobox-scatman' }
	];
	ngOnInit() {
		this.serh = {
			s: '',
			type: this.types[0].value
		};
	}
	onSubmit(val: Srchstrng) {
		this.submitted = true;
		this.getFilms(val);
		this.search = val;
	}
	edit(){
		this.submitted=false;
		if(this.search.page) delete this.search.page;
	}
	clean(){
		sessionStorage.clear()
	}
	getFilms(req: Srchstrng) {
		let a = this.listService.query(req).toString();
		if (sessionStorage.getItem(a)) {
			// // for check cash-content
			// console.log('sesion:', sessionStorage.getItem(a));
			let objfl = JSON.parse(sessionStorage.getItem(a));
			this.films = objfl.Search;
			this.errmsg = objfl.Error;
			this.fndResult = objfl.totalResults  
        }
        else {
			this.listService.getFilms(req)
				.then(
				(films: any) => {
					this.films = films.Search;
					this.errmsg = films.Error;
					this.fndResult = films.totalResults
				},
				(error: any) => this.errmsg = <any>error);
		}
	}
	/*// Remove all saved data from sessionStorage
sessionStorage.clear();*/
	//Math.ceil(parseInt(films.totalResults) / 10)
	/*get diagnostic() {
	  //console.log(this.serh.type);
	  return JSON.stringify(this.films)
	}
	  errNotify(){
		  g
	  }*/
}
