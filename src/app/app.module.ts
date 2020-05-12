import '../polyfills';
import { createCustomElement } from '@angular/elements';
import {HttpClientModule} from '@angular/common/http';
import {NgModule, Injector} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { DialogContentExampleComponent,DialogContentExampleDialog } from './dialog-content-example/dialog-content-example.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {DemoMaterialModule} from './material-modules';
import {MoviedetailsComponent} from './moviedetails/moviedetails.component';
import { from } from 'rxjs';
import { MovieService } from './moviedetails/movie.service';
@NgModule({
  declarations: [
    DialogContentExampleComponent,
    DialogContentExampleDialog,
    MoviedetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    NoopAnimationsModule
  ],
   entryComponents:[DialogContentExampleComponent,DialogContentExampleDialog],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    MovieService
  ]
})
export class AppModule {
  constructor(private injector: Injector)
  {
   const movieDetails = createCustomElement(DialogContentExampleComponent,{injector});
   this.getCustomElement('dialog-content-example',movieDetails);
   const child = createCustomElement(DialogContentExampleDialog,{injector});
   this.getCustomElement('dialog-content-example-dialog',child);
  }
  ngDoBootstrap(){}

  getCustomElement(elementName, element)
  {
    customElements.get(elementName)?
    customElements.get(elementName):
    customElements.define(elementName,element);
  }

 }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  