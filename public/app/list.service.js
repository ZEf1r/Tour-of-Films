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
    ListService.prototype.query = function (obj) {
        //console.log("obj type:", typeof obj);
        var params = new http_2.URLSearchParams();
        if (typeof obj === "object") {
            params.set('s', obj.s);
            if (obj.y) {
                params.set('y', obj.y.toString());
            }
            ;
            params.set('type', obj.type);
            if (obj.page) {
                params.set('page', obj.page.toString());
            }
            ;
        }
        else if (typeof obj === "string") {
            params.set('i', obj);
            params.set('plot', 'full');
        }
        return params;
    };
    ListService.prototype.dataCheck = function (data) {
        var a = this.query(data).toString();
        if (sessionStorage.getItem(a)) {
            return JSON.parse(sessionStorage.getItem(a));
        }
        return false;
    };
    ListService.prototype.getData = function (some) {
        return Promise.resolve(some);
    };
    ListService.prototype.getFilms = function (search) {
        return this.http.get(this.heroesUrl, { search: this.query(search) })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ListService.prototype.extractData = function (res) {
        //console.log('res', res);
        var a = res.url.replace(/\bhttp:\/\/www.omdbapi.com\/\?\b/g, '');
        //console.log("url:", a);
        var body = res.json();
        sessionStorage.setItem(a, JSON.stringify(body));
        return body || {};
    };
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
