import { Component, OnInit } from '@angular/core';
import { Srchstrng } from "./srchstrng.interface";
import { ListService } from './list.service';
import { Lof } from './lof.interface';

@Component({
	selector: 'my-search',
	templateUrl: 'templates/search.html'
})
export class SearchComponent {
	private submitted = false;
	errmsg: any;
	films: Lof[];
	fndResult: number;
	constructor(private listService: ListService) { }
	private search: Srchstrng;
	private types = [
		{ value: '', dsply: 'All', cls: 'radiobox-boing' },
		{ value: 'movie', dsply: 'Movie', cls: 'radiobox-ufo' },
		{ value: 'series', dsply: 'Series', cls: 'radiobox-focus' },
		{ value: 'episode', dsply: 'Episode', cls: 'radiobox-scatman' }
	];
	private serh: Srchstrng = {
			s: '',
			type: this.types[0].value
		}
	onSubmit(val: Srchstrng) {
		this.submitted = true;
		this.getFilms(val);
		this.search = val;
	}
	edit() {
		this.submitted = false;
		if (this.search.page) delete this.search.page;
	}
	clean() {
		sessionStorage.clear();
		console.log('Storage droped')
	}
	getFilms(req: Srchstrng) {
		let data = this.listService.dataCheck(req);
		if (data) {
			this.listService.getData(data).then(
				(objfl: any) => {
					this.films = objfl.Search;
					this.errmsg = objfl.Error;
					this.fndResult = objfl.totalResults
				}
			);
			// // for check cash-content
			//console.log('sesion:', data);
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
}
