import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OpportunityService } from '../../services/opportunity.service';
import { MasterService } from '../../services/master.service';
import { FlashService } from '../../flash/flash.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MouseEvent } from '@agm/core';
import { empty } from 'rxjs/observable/empty';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  opportunities = [];
  paging: any = {};
  searchText = '';
  opportunityId;
  currentPage = 1;
  zoom = 3;
  lat = 20.5937;
  lng = 78.9629;
  markers: marker[] = [];
  mcs: any = {};
  mcsSearch: any = [];
  selectedItem: any = '';
  inputChanged: any = '';
  countryId: any ;

  config2: any = {'placeholder': 'India', 'sourceField': ['label'], 'height': '10px'};

  onSelect(item: any) {
    this.selectedItem = item;
  }
  onInputChangedEvent(val: string) {
    this.inputChanged = val;
    if (val === '') {
      this.countryId = null;
      this.getOpportunites();
    }
  }

  constructor(
    private opportunityService: OpportunityService,
    private flashService: FlashService,
    private spinnerService: Ng4LoadingSpinnerService,
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.getOpportunites();
    this.masterService.getMcsList().subscribe(
      response => {
        this.mcs = response.body;
        this.mcs.forEach(country => {
          this.mcsSearch.push({id: country.id, label: country.name});
        });
      }, error => {
      }
    );
  }

  clickedMarker(selectedMarker) {
    this.lat = selectedMarker.lat;
    this.lng = selectedMarker.lng;
  }
  mapClicked($event: MouseEvent) {
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
  }


  /* To get List of Opportunities */
  getOpportunites() {
    this.markers = [];
    this.spinnerService.show();
    this.opportunityService.getList( this.currentPage, this.searchText, this.countryId).subscribe(
      data => {
        const response = data.body;
        this.paging = response['paging'];
        this.opportunities = response['data'];
        this.opportunities.forEach(opportunity => {
          this.markers.push({
            lat: +opportunity.lat,
            lng: +opportunity.lng,
            label: '' + opportunity.id,
            draggable: true
          });
        });
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
        this.flashService.show(error.error.status.message, 'alert-danger');
      }
    );
  }

  onSelectCountry($event) {
    this.countryId = $event.id;
    this.getOpportunites();
  }
  // /* To open edit opportunity in the modal */
  // assignOpportunityId(opportunityId) {
  //   this.opportunityId = opportunityId;
  // }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
