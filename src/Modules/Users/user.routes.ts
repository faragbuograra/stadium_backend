import { Router }              from 'express'
import { Multer }              from '../../Middlewares/multer'
import { UserController }      from './user.controller'
import { AdminUserController } from './user.controller.admin'

export const UserRoutes = (router: Router, prefix: string) => {
    router
    .route(`${prefix}/users/:id`)
        .post(
            // Multer.single("users","users", "img"),
            UserController.update
        )
        router.route(`${prefix}/users`)
        .get(
            UserController.index
        )
       
         
}

export const AdminUserRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete users to admin

    router
        .route(`${prefix}/users`)
        .get(
            AdminUserController.index
        )
    .post(
        Multer.none,
        AdminUserController.store
    )

    router
        .route(`${prefix}/users/:id`)
        .get(
            AdminUserController.show
        )
    .patch(
        Multer.none,
        AdminUserController.update
    )
    router
        .route(`${prefix}/resetpassword`)
      
    .patch(
        Multer.none,
        AdminUserController.resetpassword
    )
}
