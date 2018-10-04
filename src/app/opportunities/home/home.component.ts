import { Component, OnInit } from '@angular/core';
import { OpportunityService } from '../../services/opportunity.service';
import { FlashService } from '../../flash/flash.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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

  constructor(
    private opportunityService: OpportunityService,
    private flashService: FlashService,
    private spinnerService: Ng4LoadingSpinnerService

  ) { }

  ngOnInit() {
    this.getOpportunites();
  }

  /* To get List of Opportunities */
  getOpportunites() {
    this.spinnerService.show();
    this.opportunityService.getList( this.currentPage, this.searchText).subscribe(
      data => {
        this.spinnerService.hide();
        const response = data.body;
        this.paging = response['paging'];
        this.opportunities = response['data'];
      }, error => {
        this.spinnerService.hide();
        this.flashService.show(error.error.status.message, 'alert-danger');
      }
    );
  }

  /* To open edit opportunity in the modal */
  assignOpportunityId(opportunityId) {
    this.opportunityId = opportunityId;
  }
}
