import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminDepartmentController } from './department.controller.admin'

// import { PublicDepartmentController } from './department.controller.public'


// export const PublicDepartmentRoutes = (router: Router, prefix: string) => {
//     router.get(`${ prefix }/departments`, PublicDepartmentController.index)
//     router.get(`${ prefix }/departments/:id`, PublicDepartmentController.show)
// }

export const AdminDepartmentRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/departments`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminDepartmentController.index
        )
        .post(
            Multer.none,
            AdminDepartmentController.store
        )

    router
        .route(`${ prefix }/departments/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminDepartmentController.index
        )
        .patch(
            Multer.simple('department'),
            AdminDepartmentController.update
        )
        .delete(
            AdminDepartmentController.destroy
        )
}
