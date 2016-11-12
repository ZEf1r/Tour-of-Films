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
var core_1 = require('@angular/core');
var list_service_1 = require('./list.service');
var ListComponent = (function () {
    function ListComponent(listService, router) {
        this.listService = listService;
        this.router = router;
        this.showlist = [];
    }
    Object.defineProperty(ListComponent.prototype, "fl", {
        get: function () {
            return this.showlist;
        },
        set: function (val) {
            this.showlist = val;
        },
        enumerable: true,
        configurable: true
    });
    ListComponent.prototype.setPoster = function (purl) {
        var propty = (purl == 'N/A') ? 'url("images/pstr_na.jpg")' : 'url(' + purl + ')';
        var stls = {
            'background-image': propty
        };
        return stls;
    };
    ListComponent.prototype.detailFilm = function (id) {
        var data = this.listService.dataCheck(id);
        if (!data) {
            this.listService.getFilms(id);
            console.log('id:', data);
        }
    };
    ListComponent.prototype.gotoFilm = function (id) {
        this.router.navigate(['/detail', id]);
    };
    ListComponent.prototype.onScrollDown = function () {
        var _this = this;
        console.log('scrolled!!'); //test work scroll
        var limpage = Math.ceil(this.fr / 10);
        if (limpage > 1) {
            if (this.req.page != undefined) {
                this.req.page++; //for load next content
            }
            else
                this.req.page = 2; //for load next content
            if (this.req.page <= limpage) {
                var data = this.listService.dataCheck(this.req);
                if (data) {
                    this.listService.getData(data).then(function (objfl) {
                        for (var _i = 0, _a = objfl.Search; _i < _a.length; _i++) {
                            var f = _a[_i];
                            _this.showlist.push(f);
                        }
                    });
                }
                else {
                    this.listService.getFilms(this.req).then(function (films) {
                        for (var _i = 0, _a = films.Search; _i < _a.length; _i++) {
                            var f = _a[_i];
                            _this.showlist.push(f);
                        }
                    }, function (error) { return _this.errorMessage = error; });
                }
            }
            else
                this.errorMessage = "end of list";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "req", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ListComponent.prototype, "fr", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "fl", null);
    ListComponent = __decorate([
        core_1.Component({
            selector: 'find-films',
            templateUrl: 'templates/filmlist.html',
            styleUrls: ['css/search.css']
        }), 
        __metadata('design:paramtypes', [list_service_1.ListService, router_1.Router])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//https://www.npmjs.com/package/angular2-infinite-scroll -- for details
