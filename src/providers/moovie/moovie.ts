import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {
  baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  getApiKey():string {
    return "38c2a9201ad1adc9fd0bc9c2dd3f91de";
  }

  getLatestMovies() {
    return this.http.get(this.baseApiPath + "/movie/popular?api_key=" + this.getApiKey());
  }

  getMovieDetail(filmeid) {
    console.log(this.baseApiPath + "/movie/"+filmeid+"?api_key=" + this.getApiKey());
    return this.http.get(this.baseApiPath + "/movie/"+filmeid+"?api_key=" + this.getApiKey());
  }

}
