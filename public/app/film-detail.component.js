"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var list_service_1 = require('./list.service');
var FilmDetailComponent = (function () {
    function FilmDetailComponent(route, listService, location) {
        this.route = route;
        this.listService = listService;
        this.location = location;
    }
    FilmDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id;
        this.route.params.forEach(function (params) {
            //console.log('params:=', params);
            id = params['id'];
            //console.log('id:=', id)
        });
        var a = this.listService.dataCheck(id);
        if (a) {
            this.listService.getData(a).then(function (details) { return _this.items = details; });
        }
        else
            console.error('id:=', id);
    };
    FilmDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    FilmDetailComponent.prototype.setPoster = function (purl) {
        var propty = (purl == 'N/A') ? 'url("images/pstr_na.jpg")' : 'url(' + purl + ')';
        var stls = {
            'background-image': propty,
        };
        return stls;
    };
    FilmDetailComponent = __decorate([
        core_1.Component({
            selector: 'film-detail',
            templateUrl: 'templates/filmdetail.html',
            styleUrls: ['styles/search.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, list_service_1.ListService, common_1.Location])
    ], FilmDetailComponent);
    return FilmDetailComponent;
}());
exports.FilmDetailComponent = FilmDetailComponent;
