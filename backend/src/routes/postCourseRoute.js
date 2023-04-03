import { getDbConnection } from "../db";
import { CognitoJwtVerifier } from "aws-jwt-verify";

export const postCourseRoute = {
    path: '/api/course',
    method: 'post',
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


        const db = getDbConnection('courses');
        const result = await db.collection('courses').insertOne(req.body);
        const insertedCourse = await db.collection('courses').findOne({ _id: result.insertedId });
        //console.log(result)
        res.status(201).json({
            message: 'Course created successfully',
            course: insertedCourse,
        });




    },
};