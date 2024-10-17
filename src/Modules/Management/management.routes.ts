import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminManagementController } from './management.controller.admin'





export const AdminManagementRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/managements`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminManagementController.index
        )
        .post(
            Multer.none,
            AdminManagementController.store
        )

    router
        .route(`${ prefix }/management/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminManagementController.show
        )
        .patch(
            Multer.none,
            AdminManagementController.update
        )
      
}
