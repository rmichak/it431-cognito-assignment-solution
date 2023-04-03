import { CognitoIdentityServiceProvider } from 'aws-sdk';
import crypto from 'crypto';


export const forgotPasswordConfirmRoute = {
    path: '/api/forgot-password-confirm',
    method: 'post',
    handler: async (req, res) => {
        const { email, password, code } = req.body;

        const secretHash = crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET).update(email + process.env.COGNITO_CLIENT_ID).digest('base64');

        const provider = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region: 'us-east-1' });
        provider.confirmForgotPassword({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            Password: password,
            ConfirmationCode: code,
            SecretHash: secretHash
        }, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                return res.sendStatus(500);

            }
            else {
                console.log(data);           // successful response
                return res.sendStatus(200);
            }
        }
        );

    },
};