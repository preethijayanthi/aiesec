// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2',
  accessToken: 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c',
  googlePlacesApiUrl: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  googlePlacesApiKey: 'AIzaSyBdfogjkF6vB6ZCnXDZwNTCbP45PVbzWH8'
};
