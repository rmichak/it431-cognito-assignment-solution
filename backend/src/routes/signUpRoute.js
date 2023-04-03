import { CognitoIdentityServiceProvider } from 'aws-sdk';
import crypto from 'crypto';


export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password, name } = req.body;

        const secretHash = crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET).update(email + process.env.COGNITO_CLIENT_ID).digest('base64');

        const provider = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region: 'us-east-1' });
        provider.signUp({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            Password: password,
            SecretHash: secretHash,
            UserAttributes: [
                {
                    Name: 'name',
                    Value: name
                }
            ]
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

        // try {
        //     const data = await provider.signUp({
        //         ClientId: process.env.COGNITO_CLIENT_ID,
        //         Username: email,
        //         Password: password,
        //         SecretHash: secretHash,
        //         UserAttributes: [
        //             {
        //                 Name: 'name',
        //                 Value: name
        //             }
        //         ]


        //     }).promise();
        //     console.log(data);

        // } catch (err) {
        //     console.log(err);
        //     return res.sendStatus(500);
        // }

        // return res.sendStatus(201);

    },
};