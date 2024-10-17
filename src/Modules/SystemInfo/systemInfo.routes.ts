import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminSystemInfoController } from './systemInfo.controller.admin'

import { PublicSystemInfoController } from './systemInfo.controller.public'


export const PublicSystemInfoRoutes = (router: Router, prefix: string) => {
    router.get(`${ prefix }/systemInfo`, PublicSystemInfoController.index)
    router.get(`${ prefix }/systemInfo/:id`, PublicSystemInfoController.show)
}

export const AdminSystemInfoRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/systemInfo`)  // domain:8000/api/v1/admin/systemInfos
        .get(
            AdminSystemInfoController.index
        )
        .post(
            Multer.simple('systemInfo'),
            AdminSystemInfoController.store
        )

    router
        .route(`${ prefix }/systemInfos/:id`) // domain:8000/api/v1/admin/systemInfos/1
        .get(
            //to do 
            AdminSystemInfoController.index
        )
        .patch(
            Multer.none,
            AdminSystemInfoController.update
        )
        .delete(
            AdminSystemInfoController.destroy
        )
}
