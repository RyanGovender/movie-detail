import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

   messageSource = new BehaviorSubject(undefined);
  currentMessage = this.messageSource.asObservable();

  constructor(private _http:HttpClient) { }

  changeMessage(message) {
    this.messageSource.next(message)
  }

  private _movieWebsite = 'https://api.themoviedb.org/3/movie/';
  private _key = '?api_key=1a4c92c1e6d12e202327dea1fbeb4edd';
  private _parm = '&language=en-US';

  getMovieDetails(movieId)
  {
    return this._http.get(`${this._movieWebsite}${movieId}${this._key}${this._parm}`);
  }

  getSimilarMovieOrSeries(showId)
  {
     return this._http.get(`${this._movieWebsite}${showId}/similar${this._key}&language=en-US&page=1`);
  }
}
