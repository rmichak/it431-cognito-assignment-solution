import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const getCourseRoute = {
    path: '/api/course/:id',
    method: 'get',
    handler: async (req, res) => {
        const id = req.params.id;

        const query = { "_id": new ObjectId(id) };
        const db = getDbConnection('courses');
        const result = await db.collection('courses').findOne(query);

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("course not found");
        }
    },
};