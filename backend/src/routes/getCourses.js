import { getDbConnection } from "../db";

export const getCoursesRoute = {
    path: '/api/course',
    method: 'get',
    handler: async (req, res) => {
        const db = getDbConnection('courses');
        const result = await db.collection('courses').find().toArray();
        //`console.log(result)

        res.status(200).send(result);
    },
};