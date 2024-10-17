import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminTypeController } from './type.controller.admin'

// import { PublicTypeController } from './department.controller.public'


// export const PublicTypeRoutes = (router: Router, prefix: string) => {
//     router.get(`${ prefix }/departments`, PublicTypeController.index)
//     router.get(`${ prefix }/departments/:id`, PublicTypeController.show)
// }

export const AdminTypeRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/types`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminTypeController.index
        )
        .post(
            Multer.none,
            AdminTypeController.store
        )

    router
        .route(`${ prefix }/types/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminTypeController.index
        )
        .patch(
            Multer.none,
            AdminTypeController.update
        )
        .delete(
            AdminTypeController.destroy
        )
}
