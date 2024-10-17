import { Router }   from 'express'
import { UserController } from '../Users/user.controller'
import { Multer }   from '../../Middlewares/multer'

import { register } from './register'
import { webLogin } from './web-login'

export const PublicAuthRoutes = (router: Router, prefix: string) => {

    router.post(
        `${ prefix }/admin/web-login`,
        Multer.none,
        webLogin
    )

    router.post(
        `${ prefix }/register`,
        Multer.none,
        register
    )

    .route(`${prefix}/users/activePhone`)
    .patch(
        // Multer.single("users","users", "img"),
        UserController.activePhone
    )


   
}
