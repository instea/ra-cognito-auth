import { CognitoUserPool } from 'amazon-cognito-identity-js-promises';
import { AuthProvider } from 'react-admin';
export type CognitoAuthProviderOptions = {
    userPool: CognitoUserPool;
};
export declare function buildCognitoAuthProvider({ userPool, }: CognitoAuthProviderOptions): AuthProvider;
