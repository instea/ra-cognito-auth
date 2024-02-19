# ra-cognito-auth

AWS Cognito auth provider for react-admin.

## Installation

```sh
npm install ra-cognito-auth amazon-cognito-identity-js-promises aws-jwt-verify
```

## Usage

### Basic usage

Build auth provider and pass it to the react admin. If no cognito jwt verifier is passed to the build function, only the validity of the session is checked during the checkAuth method. If provided, the jwt token is verified against the verifier.

Example:

```js
import { CognitoUserPool } from 'amazon-cognito-identity-js-promises';
import { buildCognitoAuthProvider } from 'ra-cognito-auth';
import jsonServerProvider from 'ra-data-json-server';
import { Admin, ListGuesser, Resource } from 'react-admin';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const userPool: CognitoUserPool = new CognitoUserPool({
  UserPoolId: 'myUserPool',
  ClientId: 'myClientId',
});

const cognitoJwtVerifier = CognitoJwtVerifier.create({
  tokenUse: 'access',
  userPoolId: 'myUserPool',
  clientId: 'myClientId',
});

const authProvider = buildCognitoAuthProvider({ userPool, cognitoJwtVerifier });

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" list={ListGuesser} />
  </Admin>
);
```

### Usage with verifying JWT

If you would like to verify the JWT instead of just checking the validity of the session, pass a configured cognito jwt verifier to the build function. The JWT token from the session is then verified against the verifier during the checkAuth method of the provider.

Example:

```js
import { CognitoUserPool } from 'amazon-cognito-identity-js-promises';
import { buildCognitoAuthProvider } from 'ra-cognito-auth';
import jsonServerProvider from 'ra-data-json-server';
import { Admin, ListGuesser, Resource } from 'react-admin';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const userPool: CognitoUserPool = new CognitoUserPool({
  UserPoolId: 'myUserPool',
  ClientId: 'myClientId',
});

const cognitoJwtVerifier = CognitoJwtVerifier.create({
  tokenUse: 'access',
  userPoolId: 'myUserPool',
  clientId: 'myClientId',
});

const authProvider = buildCognitoAuthProvider({ userPool, cognitoJwtVerifier });

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" list={ListGuesser} />
  </Admin>
);
```

Get access token from the cognito pool to authorize api calls:

````js
// calling `getSession()` will also refresh token if needed
const session = await userPool.getCurrentUser()?.getSession();
const accessToken = session?.getAccessToken().getJwtToken();
```x
````
