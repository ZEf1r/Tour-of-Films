import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
@Component({
	selector: 'film-detail',
	templateUrl: 'templates/filmdetail.html',
	styleUrls: ['css/search.css']
})
export class FilmDetailComponent implements OnInit {
	private items: string[];
	constructor(
		private route: ActivatedRoute,
		private listService: ListService,
		private location: Location
	) { }
	ngOnInit() {
		let id: string;
		this.route.params.forEach((params: Params) => {
			id = params['id'];
		});
		let a = this.listService.dataCheck(id);
		if (a) {
			this.listService.getData(a).then(
				(details: any) => this.items = details
			)
		}
	}
	goBack(): void {
		this.location.back();
	}
	setPoster(purl: string) {
		let stls = {
			'background-image': (purl == 'N/A') ? 'url("images/pstr_na.jpg")' : 'url(' + purl + '), url("images/pstr_na.jpg")'
		};
		return stls;
	}
}