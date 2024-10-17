import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminRoleController } from './role.controller.admin'





export const AdminRoleRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/roles`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminRoleController.index
        )
        .post(
            Multer.none,
            AdminRoleController.store
        )

    router
        .route(`${ prefix }/roles/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminRoleController.index
        )
        .patch(
            Multer.simple('department'),
            AdminRoleController.update
        )
        .delete(
            AdminRoleController.destroy
        )
}
