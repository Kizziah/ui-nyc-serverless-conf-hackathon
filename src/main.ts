import Amplify from '@aws-amplify/core';
import { DEV_ENV } from './app/app.constants';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

Amplify.configure({
  Auth: {
    identityPoolId: DEV_ENV.cognito.IDENTITY_POOL_ID,
    region: DEV_ENV.cognito.REGION,
    identityPoolRegion: DEV_ENV.cognito.REGION,
    userPoolId: DEV_ENV.cognito.USER_POOL_ID,
    userPoolWebClientId: DEV_ENV.cognito.APP_CLIENT_ID,
    mandatorySignIn: DEV_ENV.cognito.MANDATORY_SIGN_IN,
  },
  Storage: {
    region: DEV_ENV.s3.REGION,
    bucket: DEV_ENV.s3.BUCKET,
    identityPoolId: DEV_ENV.cognito.IDENTITY_POOL_ID
  },
});