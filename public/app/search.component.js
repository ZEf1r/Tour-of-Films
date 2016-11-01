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
var list_service_1 = require('./list.service');
var SearchComponent = (function () {
    function SearchComponent(listService) {
        this.listService = listService;
        this.title = 'Tour of Films';
        this.submitted = false;
        this.types = [
            { value: '', dsply: 'All', cls: 'radiobox-boing' },
            { value: 'movie', dsply: 'Movie', cls: 'radiobox-ufo' },
            { value: 'series', dsply: 'Series', cls: 'radiobox-focus' },
            { value: 'episode', dsply: 'Episode', cls: 'radiobox-scatman' }
        ];
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.serh = {
            s: '',
            type: this.types[0].value
        };
    };
    SearchComponent.prototype.onSubmit = function (val) {
        this.submitted = true;
        this.getFilms(val);
        this.search = val;
    };
    SearchComponent.prototype.edit = function () {
        this.submitted = false;
        if (this.search.page)
            delete this.search.page;
    };
    SearchComponent.prototype.clean = function () {
        sessionStorage.clear();
    };
    SearchComponent.prototype.getFilms = function (req) {
        var _this = this;
        var a = this.listService.query(req).toString();
        if (sessionStorage.getItem(a)) {
            // // for check cash-content
            // console.log('sesion:', sessionStorage.getItem(a));
            var objfl = JSON.parse(sessionStorage.getItem(a));
            this.films = objfl.Search;
            this.errmsg = objfl.Error;
            this.fndResult = objfl.totalResults;
        }
        else {
            this.listService.getFilms(req)
                .then(function (films) {
                _this.films = films.Search;
                _this.errmsg = films.Error;
                _this.fndResult = films.totalResults;
            }, function (error) { return _this.errmsg = error; });
        }
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'my-test',
            templateUrl: 'templates/search.html',
            providers: [list_service_1.ListService]
        }), 
        __metadata('design:paramtypes', [list_service_1.ListService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
