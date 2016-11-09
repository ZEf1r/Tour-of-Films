import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
@Component({
	selector: 'film-detail',
	templateUrl: 'templates/filmdetail.html',
	styleUrls: ['styles/search.css']
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
			//console.log('params:=', params);
			id = params['id'];
			//console.log('id:=', id)
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
		let propty = (purl == 'N/A') ? 'url("images/pstr_na.jpg")' : 'url(' + purl + ')';
		let stls = {
			'background-image': propty,
			//'background-size': 'cover'
		};
		return stls;
	}
}