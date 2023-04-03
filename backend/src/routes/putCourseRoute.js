import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';
import { CognitoJwtVerifier } from "aws-jwt-verify";

export const putCourseRoute = {
    path: '/api/course/:id',
    method: 'put',
    handler: async (req, res) => {

        const { authorization } = req.headers;

        //verify header was sent
        if (!authorization || authorization === "Bearer null") {
            console.log("header missing");
            return res.status(401).json({ message: "No authorization header sent." });

        }

        // Verifier that expects valid access tokens:
        const verifier = CognitoJwtVerifier.create({
            userPoolId: process.env.COGNITO_USER_POOL_ID,
            tokenUse: "access",
            clientId: process.env.COGNITO_CLIENT_ID,
        });

        try {
            const payload = await verifier.verify(
                authorization.split(" ")[1] // the JWT as string
            );
            // console.log("Token is valid. Payload:", payload);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ result: "Token Validation Error" });
        }


        const { id } = req.params;

        const query = { "_id": new ObjectId(id) };
        const db = getDbConnection('courses');

        const existingCourse = await db.collection('courses').findOne(query);

        if (existingCourse) {
            const courseData = req.body;
            //exclude the _id field from being updated
            delete courseData._id;

            const result = await db.collection('courses').findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: courseData },
                { returnOriginal: false }
            );

            res.status(200).send(result.value);
        } else {
            res.status(404).send('course not found');
        }






    },
};