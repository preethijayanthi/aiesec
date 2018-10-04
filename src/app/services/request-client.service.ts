import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestClientService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(url) {
    return this.httpClient.get(url, {observe: 'response'});
  }
  update(url, formValue) {
    return this.httpClient.patch(url, formValue, {observe: 'response'});
  }
}
