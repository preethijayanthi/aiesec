import { Component, OnInit, Input } from '@angular/core';
import { OpportunityService } from '../../services/opportunity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashService } from '../../flash/flash.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  opportunityId;
  opportunity: any = {};

  constructor(
    private opportunityService: OpportunityService,
    private route: ActivatedRoute,
    private flashService: FlashService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.opportunityId = params['id'];
      }
    );
    this.spinnerService.show();
    this.opportunityService.getOpportunity(this.opportunityId).subscribe(
      response => {
        this.spinnerService.hide();
        this.opportunity = response.body;
      }, error => {
        this.spinnerService.hide();
        this.flashService.show(error.error.status.message, 'alert-danger');
      }
    );
  }

}
