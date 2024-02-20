import { CognitoUserPool } from 'amazon-cognito-identity-js-promises';
import { AuthProvider } from 'react-admin';
import { CognitoJwtVerifierProperties, CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';
export type CognitoAuthProviderOptions = {
    userPool: CognitoUserPool;
    cognitoJwtVerifier?: CognitoJwtVerifierSingleUserPool<{
        tokenUse: 'id' | 'access';
        clientId: string;
    } & CognitoJwtVerifierProperties>;
};
export declare function buildCognitoAuthProvider({ userPool, cognitoJwtVerifier, }: CognitoAuthProviderOptions): AuthProvider;
