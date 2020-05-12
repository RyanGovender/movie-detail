import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter,ChangeDetectorRef, ElementRef } from '@angular/core';
import { MovieService } from './movie.service';
import { MovieDetails } from '../IMovieDetails';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'movie-details',
  template: `
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
 </head>

<body>

<p>I work Hoooeoe</p>
<div *ngIf="movieDetails">
  
        <div class="row no-gutters">
          <div class="col-lg-9">
            <div class="container-fluid">
              <img class="image" src="https://image.tmdb.org/t/p/original{{movieDetails.backdrop_path}}" height="100%" alt="">
              <div class="card-img-overlay middle">
                <h1 style="font-size: 3vw!important;color:white;"> {{movieDetails.title}} </h1>
                <p class="text text-white" style="font-size: 2vw!important;font-weight: 300;">  {{movieDetails.overview}}</p>
          </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card-body">
              <h5 class="card-title text-white" style="text-align: center;">{{movieDetails.title}}  </h5>
                  <h6 class="card-title text-primary" style="text-align: center;">IMDB : {{movieDetails.vote_average}}/10</h6>
              <p class="card-text ">
                <strong> Release Year :  </strong>  {{movieDetails.release_date}}
                <br>
                 <strong>Tagline : </strong> {{movieDetails.tagline}}
                 <br>
                 <strong>Runtime : </strong>{{movieDetails.runtime}} minutes
                  <br>
                  <br>
                  <!-- {{movie2.Plot}}
                 <br>
                 <br> -->
                  <strong>Budget : </strong> $ {{movieDetails.budget}}
                  <br>
                  <br>
                  <strong>Revenue :</strong> $ {{movieDetails.revenue}}
              </p>
               <p class="card-text"><small class="text-muted">Release Date : {{movieDetails.release_date}}</small></p>
               <button type="button" class="btn btn-success" (click)="AddToCart();">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
     


</body>
 

  `,
  styles: [`
  strong{
    color: white!important;
}
p{
    color: grey;
}
body{
  background-color: transparent !important;
}
.flex-container {
    display: -webkit-box;
    /* display: flex; */
  }
  
  .fill-width {
    flex: 1;
  }

  .container-fluid {
    position: relative;
    width: 100%;
  }
  
  .image {
    opacity: 0.6;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
  }
  .middle {
    transition: .5s ease;
    opacity: 1;
    top: 20%;
    /* position: absolute;
    top: 30%;
    left: 50%; */
    /* transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%); */
    text-align: center;
  }
  
  .container-fluid:hover .image {
    opacity: 1;
  }
  
  .container-fluid:hover .middle {
    opacity: 0;
  }
  
  `],
  encapsulation : ViewEncapsulation.ShadowDom
})

export class MoviedetailsComponent  {

  @Input() movie = '24428';
  movieDetails :MovieDetails = {
    adult:false,
    backdrop_path:'',
    budget:0,
    homepage:'',
    id:0,
    imdb_id:'dd',
    original_language:'',
    original_title:'',
    overview:'',
    popularity:0,
    poster_path:'',
    release_date: '',
    revenue:0,
    runtime:121,
    status:'',
    tagline:'',
    title:'',
    video:false,
    vote_average:0,
    vote_count:0
  };
  @Output() movieEvent : EventEmitter<MovieDetails> = new EventEmitter<MovieDetails>();
  selectedMovie:MovieDetails;

  constructor(private _movieService: MovieService, private ref:ChangeDetectorRef,public dialog: MatDialog) {
   
  }

    ngOnChanges()
    {
      this.getMovieDetails();
    }

    getMovieDetails()
    {
    
        this._movieService.getMovieDetails(this.movie).subscribe(
          (data:any) =>
          {
            this.movieDetails = data;
            this.ref.detectChanges();
          }
        );  
    }


  AddToCart()
  {
      this.selectedMovie = this.movieDetails;
      this.movieEvent.emit(this.selectedMovie);
  }


}
