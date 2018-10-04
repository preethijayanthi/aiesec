import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestClientService } from './request-client.service';

@Injectable()
export class MasterService {

  constructor(
    private requestClient: RequestClientService,
  ) { }

  getSkills() {
    const uri = environment.baseUrl + '/lists/skills?access_token=' + environment.accessToken;
    return this.requestClient.get(uri);
  }

  getBackGrounds() {
    const uri = environment.baseUrl + '/lists/backgrounds?access_token=' + environment.accessToken;
    return this.requestClient.get(uri);
  }

  getGooglePlaces(query) {
    const uri = environment.googlePlacesApiUrl + '?input=' + query + '&key' + environment.googlePlacesApiKey;
    return this.requestClient.get(uri);
  }
}
