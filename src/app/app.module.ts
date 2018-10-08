import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { HomeComponent } from './opportunities/home/home.component';
import { routers } from './app.router';
import { MasterService } from './services/master.service';
import { OpportunityService } from './services/opportunity.service';
import { RequestClientService } from './services/request-client.service';
import { EditComponent } from './opportunities/edit/edit.component';
import { DetailsComponent } from './opportunities/details/details.component';
import { FlashComponent } from './flash/flash.component';
import { FlashService } from './flash/flash.service';
import { ShowErrorsComponent } from './show-errors/show-errors.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { AutocompleteModule } from 'ng2-input-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    DetailsComponent,
    FlashComponent,
    ShowErrorsComponent
  ],
  imports: [
    GooglePlaceModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxPaginationModule,
    FlashMessagesModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),
    Ng4GeoautocompleteModule.forRoot(),
    // MapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBdfogjkF6vB6ZCnXDZwNTCbP45PVbzWH8'
    }),
    AutocompleteModule,
    routers
    ],
  providers: [
    MasterService,
    OpportunityService,
    RequestClientService,
    FlashService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


