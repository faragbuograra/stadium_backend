import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminStadiumController } from './stadium.controller.admin'

import { PublicStadiumController } from './stadium.controller.public'


export const PublicStadiumRoutes = (router: Router, prefix: string) => {
    router.get(`${ prefix }/Stadium`, PublicStadiumController.index)
    router.get(`${ prefix }/Stadium/:id`, PublicStadiumController.show)
}

export const AdminStadiumRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/Stadium`)  // domain:8000/api/v1/admin/Stadium
        .get(
            AdminStadiumController.index
        )
        .post(
            Multer.simple('Stadium'),
            AdminStadiumController.store
        )

    router
        .route(`${ prefix }/Stadium/:id`) // domain:8000/api/v1/admin/Stadium/1
        .get(
            //to do 
            AdminStadiumController.index
        )
        .patch(
            Multer.simple('Stadium'),
            AdminStadiumController.update
        )
        // .delete(
        //     AdminStadiumController.destroy
        // )
}
