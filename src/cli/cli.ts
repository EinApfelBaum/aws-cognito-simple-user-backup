#!/usr/bin/env node

import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

import { backupUsers } from '../index';

const userPoolId = 'YOUR_USER_POOL_ID';

(async () => {
  try {

    const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({});
    await backupUsers(cognitoIdentityProviderClient, userPoolId);

  } catch (error) {

    process.exit(1);
  }
})();
