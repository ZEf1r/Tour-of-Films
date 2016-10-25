import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import './rxjs-operators';

@Injectable()
export class ListService {
    
    private heroesUrl = 'http://www.omdbapi.com/';  // URL to web API
    constructor(private http: Http) {}
    getFilms(): Promise<Lof[]> {
        let params = new URLSearchParams();
        params.set('s', model.s);
        params.set('location', model.y);
        params.set('animal', model.type);
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        return this.http.get(this.heroesUrl, { search: params })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.Search || { };
    }
    /*getFilm(imdbID: string): Promise<Lof> {
        return this.getFilms()
               .then(heroes => heroes.find(film => film.imdbID === imdbID));
    }*/
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}