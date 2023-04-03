import { getCoursesRoute } from './getCourses';
import { getCourseRoute } from './getCourseRoute';
import { postCourseRoute } from './postCourseRoute';
import { deleteCourseRoute } from './deleteCourseRoute';
import { putCourseRoute } from './putCourseRoute';
import { loginRoute } from './loginRoute';
import { signUpRoute } from './signUpRoute';
import { getUsersRoute } from './getUsersRoute';
import { signUpVerifyRoute } from './signupVerifyRoute';
import { forgotPasswordRoute } from './forgotPasswordRoutes';
import { forgotPasswordConfirmRoute } from './confirmPasswordRoute';

export const routes = [
    getCoursesRoute,
    getCourseRoute,
    postCourseRoute,
    deleteCourseRoute,
    putCourseRoute,
    loginRoute,
    signUpRoute,
    signUpVerifyRoute,
    getUsersRoute,
    forgotPasswordRoute,
    forgotPasswordConfirmRoute
];
