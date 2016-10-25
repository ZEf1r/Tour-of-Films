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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
require('./rxjs-operators');
var ListService = (function () {
    function ListService(http) {
        this.http = http;
        this.heroesUrl = 'http://www.omdbapi.com/'; // URL to web API
    }
    ListService.prototype.getFilms = function () {
        var params = new http_2.URLSearchParams();
        params.set('s', model.s);
        params.set('location', model.y);
        params.set('animal', model.type);
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        return this.http.get(this.heroesUrl, { search: params })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ListService.prototype.extractData = function (res) {
        var body = res.json();
        return body.Search || {};
    };
    /*getFilm(imdbID: string): Promise<Lof> {
        return this.getFilms()
               .then(heroes => heroes.find(film => film.imdbID === imdbID));
    }*/
    ListService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListService);
    return ListService;
}());
exports.ListService = ListService;
