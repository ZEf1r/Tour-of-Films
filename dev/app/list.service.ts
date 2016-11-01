import { Srchstrng } from './srchstrng';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import './rxjs-operators';

@Injectable()
export class ListService {
    private heroesUrl = 'http://www.omdbapi.com/';  // URL to web API
    constructor(private http: Http) {}
    query(obj: Srchstrng){
        let params = new URLSearchParams();
        params.set('s', obj.s);
        if (obj.y) {
            params.set('y', obj.y.toString())
        };
        params.set('type', obj.type);
        if (obj.page) {
            params.set('page', obj.page.toString())
        };
        return params
    }
    getFilms(search: Srchstrng): Promise<any> {
            return this.http.get(this.heroesUrl, { search: this.query(search) })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        //console.log('res', res);
        let a = res.url.replace(/\bhttp:\/\/www.omdbapi.com\/\?\b/g, '');
        let body = res.json();
        sessionStorage.setItem(a, JSON.stringify(body));
        return body || { };
    }
    handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}