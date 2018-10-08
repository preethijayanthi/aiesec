// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'https://gis-api.aiesec.org/v2',
  accessToken: '724069aafad019105a91e0bed316747ac1ccadcd48847a82c19d5ace23125075',
  googlePlacesApiUrl: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  googlePlacesApiKey: 'AIzaSyBdfogjkF6vB6ZCnXDZwNTCbP45PVbzWH8'
};
