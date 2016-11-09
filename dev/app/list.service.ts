import { Srchstrng } from './srchstrng.interface';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import './rxjs-operators';
type Qry = Srchstrng | string;

@Injectable()
export class ListService {
    private heroesUrl = 'http://www.omdbapi.com/';  // URL to web API
    constructor(private http: Http) { }
    query(obj: Qry) {
        //console.log("obj type:", typeof obj);
        let params = new URLSearchParams();
        if (typeof obj === "object") {
            params.set('s', obj.s);
            if (obj.y) {
                params.set('y', obj.y.toString())
            };
            params.set('type', obj.type);
            if (obj.page) {
                params.set('page', obj.page.toString())
            };
        }
        else if (typeof obj === "string") {
            params.set('i', obj);
            params.set('plot', 'full')
        }
        return params
    }
    dataCheck(data: Qry) {
        let a = this.query(data).toString();
        if (sessionStorage.getItem(a)) {
            return JSON.parse(sessionStorage.getItem(a))
        }
        return false
    }
    getData(some: any): Promise<any> {
        return Promise.resolve(some)
    }
    getFilms(search: Qry): Promise<any> {
        return this.http.get(this.heroesUrl, { search: this.query(search) })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        //console.log('res', res);
        let a = res.url.replace(/\bhttp:\/\/www.omdbapi.com\/\?\b/g, '');
        //console.log("url:", a);
        let body = res.json();
        sessionStorage.setItem(a, JSON.stringify(body));
        return body || {};
    }
    handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}