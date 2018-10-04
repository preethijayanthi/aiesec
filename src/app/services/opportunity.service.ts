import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestClientService } from './request-client.service';
@Injectable()
export class OpportunityService {

  baseUrl = environment.baseUrl + '/opportunities';
  constructor(
    private requestClient: RequestClientService
  ) { }


  /* getting/searching opportunity List */
  getList(currentPage, query) {
    currentPage = currentPage != null ? currentPage : 1;
    const uri = this.baseUrl + '/search?access_token=' + environment.accessToken + '&q=' +
    query + '&page=' + currentPage + '&per_page=20&sort=-created';
    return this.requestClient.get(uri);
  }

  getOpportunity(id) {
    const uri = this.baseUrl + '/' + id + '?access_token=' + environment.accessToken;
    return this.requestClient.get(uri);
  }

  updateOpportunity(id, formValue) {
    const uri = this.baseUrl + '/' + id;
    return this.requestClient.update(uri, formValue);
  }

}
