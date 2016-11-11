import { Router } from '@angular/router';
import { Srchstrng } from './srchstrng.interface';
import { Lof } from './lof.interface';
import { Component, Input } from '@angular/core';
import { ListService } from './list.service';

@Component({
	selector: 'find-films',
	templateUrl: 'templates/filmlist.html',
	styleUrls: ['css/search.css']
})
export class ListComponent {
	@Input() req: Srchstrng;
	@Input() fr: number;
	showlist: any = [];
	@Input()
	get fl() {
		return this.showlist;
	}
	set fl(val: any) {
		this.showlist = val;
	}
	errorMessage: string;
	constructor(private listService: ListService, private router: Router) { }
	setPoster(purl: string) {
		let propty = (purl == 'N/A') ? 'url("images/pstr_na.jpg")' : 'url(' + purl + ')';
		let stls = {
			'background-image': propty
		};
		return stls;
	}
	detailFilm(id: string) {
		let data = this.listService.dataCheck(id);
		if (!data) {
			this.listService.getFilms(id);
			console.log('id:', data);
		}
	}
	gotoFilm(id: string): void {
		this.router.navigate(['/detail', id])
	}
	onScrollDown() {
		console.log('scrolled!!');//test work scroll
		let limpage = Math.ceil(this.fr / 10);
		if (limpage > 1) {
			if (this.req.page != undefined) {
				this.req.page++ //for load next content
			}
			else this.req.page = 2; //for load next content
			if (this.req.page <= limpage) {
				let data = this.listService.dataCheck(this.req);
				if (data) {
					this.listService.getData(data).then(
						(objfl: any) => {
							for (var f of objfl.Search) {
								this.showlist.push(f);
							}
						})
				}
				else {
					this.listService.getFilms(this.req).then(
						(films: any) => {
							for (var f of films.Search) {
								this.showlist.push(f);
							}
						},
						(error: any) => this.errorMessage = <any>error)
				}
			}
			else this.errorMessage = "end of list";
		}
	}
}
//https://www.npmjs.com/package/angular2-infinite-scroll -- for details
