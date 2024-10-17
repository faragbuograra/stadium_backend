import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminCompaniesController } from './companies.controller.admin'

// import { PublicCompaniesController } from './department.controller.public'


// export const PublicCompaniesRoutes = (router: Router, prefix: string) => {
//     router.get(`${ prefix }/departments`, PublicCompaniesController.index)
//     router.get(`${ prefix }/departments/:id`, PublicCompaniesController.show)
// }

export const AdminCompaniesRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/Companies`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminCompaniesController.index
        )
        .post(
            Multer.none,
            AdminCompaniesController.store
        )

    router
        .route(`${ prefix }/Companies/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminCompaniesController.index
        )
        .patch(
            Multer.simple('department'),
            AdminCompaniesController.update
        )
        // .delete(
        //     AdminCompaniesController.destroy
        // )
}
