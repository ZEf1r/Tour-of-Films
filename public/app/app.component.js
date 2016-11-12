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
var AppComponent = (function () {
    function AppComponent() {
        this.scrollup = {
            name: 'UP', state: 'a',
            toggleState: function () {
                this.state = (this.state === 'b' ? 'a' : 'b');
            }
        };
        this.title = 'Tour of Films';
    }
    AppComponent.prototype.top = function () {
        return (window.pageYOffset > 1200);
    };
    AppComponent.prototype.scrollTo = function () {
        console.log("click shar!");
        window.scroll(0, 0);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-test',
            template: "\n    <h1>{{title}}</h1>\n    <nav>\n      <a routerLink=\"/search\" routerLinkActive=\"active\">Search</a>\n    </nav>\n    <div [hidden]=\"!top()\" [@scrollState]=\"scrollup.state\"\n\t(mouseover)=\"scrollup.toggleState()\"\n\t(mouseout)=\"scrollup.toggleState()\"\n\t(click)=\"scrollTo()\"><br>{{scrollup.name}}</div>\n    <router-outlet></router-outlet>\n  ",
            styles: ["\n    div {\n      width:50px;\n\t  height:110px;\n\t  background-image: url(\"images/shar.png\");\n\t  font: 18pt bold;\n\t  text-align: center;\n\t  right: 3px;\n\t  bottom: 1%;\n\t  z-index: 222;\n\t  cursor: pointer;\n\t  position: fixed;\n\t  border-radius: 30px 30px;\n    }\n  "],
            animations: [
                core_1.trigger('scrollState', [
                    core_1.state('a', core_1.style({
                        //backgroundColor: '#cf0', <img src="images/shar.png" alt="{{scrollup.name}}">
                        transform: 'scale(0.7)',
                        opacity: '0.4'
                    })),
                    core_1.state('b', core_1.style({
                        //backgroundColor: '#0cf',
                        opacity: '0.9',
                        transform: 'scale(1.1)'
                    })),
                    core_1.transition('a <=> b', [
                        core_1.animate('480ms ease-in', core_1.style({
                            backgroundColor: '#0cf',
                            transform: 'translateY(-5px)'
                        }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
