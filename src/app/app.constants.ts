// API URLS
export const SERVER_URL = 'http://localhost:3000/';
// export const BENEFIT_API_URL = 'api/v1/benefit/';
export const BENEFIT_API_URL = 'benefits';
export const APPLICATION_API_URL = 'applications';
export const DOCUMENT_API_URL = 'api/v1/document/';
// export const PERSON_API_URL = 'api/v1/person/';
export const PERSON_API_URL = 'persons';
export const USER_PROFILE_API_URL = 'api/v1/user_profile/';

export const DEV_ENV = {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'mtc-enduser-ui-dev-20190705161813-deployment',
    ACCESSKEYID: 'AKIA6FBHC4E5XF5PWVNN',
    SECRETKEYACCESS: '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',

  },
  apiGateway: {
    persons: {
      REGION: 'us-east-1',
      URL: ''
    }
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_AWfUPQvmM',
    APP_CLIENT_ID: '2en4ri4pgduto99m97vkuatr05',
    IDENTITY_POOL_ID: 'us-east-1:ea8750c6-1218-491d-9f62-d82f5c3cdab2',
    MANDATORY_SIGN_IN: false
  }
};




