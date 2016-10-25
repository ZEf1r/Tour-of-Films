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
require('./rxjs-operators');
var model = (function () {
    function model(s, type, y) {
        this.s = s;
        this.type = type;
        this.y = y;
    }
    return model;
}());
;
var SearchComponent = (function () {
    function SearchComponent() {
        this.title = 'Tour of Films';
        this.serh = new model('');
        this.submitted = false;
    }
    SearchComponent.prototype.onSubmit = function () { this.submitted = true; };
    Object.defineProperty(SearchComponent.prototype, "diagnostic", {
        get: function () {
            //console.log(this.serh.type);
            return JSON.stringify(this.serh);
        },
        enumerable: true,
        configurable: true
    });
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'my-test',
            templateUrl: 'templates/search.html',
            styleUrls: ['styles/search.css']
        }), 
        __metadata('design:paramtypes', [])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
