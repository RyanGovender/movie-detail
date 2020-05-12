import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MoviedetailsComponent} from '../moviedetails/moviedetails.component'
import { MovieDetails } from '../IMovieDetails';
import { MovieService } from '../moviedetails/movie.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
  <head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
  
<body>
<h2 mat-dialog-title></h2>
<mat-dialog-content class="">
<div *ngIf="movieDetails">
<div class="card">
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
            <h5 class="card-title text-black" style="text-align: center;">{{movieDetails.title}}  </h5>
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
           
          </div>
        </div>
      </div>
    </div>
    </div> 
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button type="button" class="btn btn-danger" mat-dialog-close>Cancel</button>
    <button type="button" class="btn btn-success" (click)="AddToCart();">Add To Cart</button>
  </mat-dialog-actions>
  </body>
  `
  ,
  styles: [`
  strong{
    color: black!important;
}
p{
    color: grey;
}
body{
  background-color: white!important;
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
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DialogContentExampleDialog {

  movie :any;
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
  message:any;

  constructor(private _movieService: MovieService, private ref:ChangeDetectorRef,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this._movieService.currentMessage.subscribe(message => this.message = message);
    this.movie = data.movie;
    this.getMovieDetails();
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
      this._movieService.changeMessage(this.selectedMovie);
  }

}


@Component({
  selector: 'dialog-content-example',
  template: `<button (click)="openDialog()" id="testBtn" hidden="true" >View Movie</button>`,
  styleUrls: ['./dialog-content-example.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DialogContentExampleComponent {
  @Input() movie:any;
  @Output() clicked : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() movieEvent : EventEmitter<MovieDetails> = new EventEmitter<MovieDetails>();
  constructor(public dialog: MatDialog,private _movieService: MovieService) { 
  }

  message:any;

  openDialog() {

    this._movieService.currentMessage.subscribe(message =>{ 
      this.message = message;
      if(this.message!=undefined) this.movieEvent.emit(this.message);
    });
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      data:{
        movie : this.movie
      }
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.clicked.emit(true);
    
  }
}
