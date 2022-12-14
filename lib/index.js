import { AuthenticationDetails, CognitoUser, } from 'amazon-cognito-identity-js-promises';
class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized');
    }
}
export function buildCognitoAuthProvider({ userPool, }) {
    return {
        // send username and password to the auth server and get back credentials
        async login({ username, password }) {
            const user = new CognitoUser({
                Pool: userPool,
                Username: username,
            });
            user.setAuthenticationFlowType('USER_PASSWORD_AUTH');
            await user.authenticateUser(new AuthenticationDetails({
                Username: username,
                Password: password,
            }));
        },
        // when the dataProvider returns an error, check if this is an authentication error
        checkError(error) {
            if (error.message.includes('401') ||
                error.message.toLowerCase().includes('unauthorized')) {
                return Promise.reject(new UnauthorizedError());
            }
            return Promise.resolve();
        },
        // when the user navigates, make sure that their credentials are still valid
        async checkAuth() {
            const user = userPool.getCurrentUser();
            const session = await user?.getSession(); // this will also refresh token if needed
            if (!session?.isValid()) {
                throw new UnauthorizedError();
            }
        },
        // remove local credentials and notify the auth server that the user logged out
        async logout() {
            await userPool.getCurrentUser()?.signOut();
        },
        // get the user's profile
        async getIdentity() {
            const user = await userPool.getCurrentUser();
            if (!user) {
                throw new UnauthorizedError();
            }
            const username = user.getUsername();
            return Promise.resolve({ id: username });
        },
        // get the user permissions (optional)
        getPermissions: () => Promise.resolve(),
    };
}
