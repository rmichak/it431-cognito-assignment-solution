import { CognitoIdentityServiceProvider } from 'aws-sdk';
import crypto from 'crypto';


export const signUpVerifyRoute = {
    path: '/api/signup-verify',
    method: 'post',
    handler: async (req, res) => {
        const { email, code } = req.body;

        const secretHash = crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET).update(email + process.env.COGNITO_CLIENT_ID).digest('base64');

        const provider = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region: 'us-east-1' });
        var params = {
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
            SecretHash: secretHash
        }
        provider.confirmSignUp(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                return res.sendStatus(500);

            }

            else {
                console.log(data);           // successful response
                return res.sendStatus(200);
            }
        });

        return res.sendStatus(200);
    },
};