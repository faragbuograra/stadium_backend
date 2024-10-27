import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminMatchController } from './match.controller.admin'

// import { PublicMatchController } from './department.controller.public'


// export const PublicMatchRoutes = (router: Router, prefix: string) => {
//     router.get(`${ prefix }/departments`, PublicMatchController.index)
//     router.get(`${ prefix }/departments/:id`, PublicMatchController.show)
// }

export const AdminMatchRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin
    router
    .route(`${ prefix }/myMatch`)  // domain:8000/api/v1/admin/categorys
    .get(
        AdminMatchController.me
    )
    router
        .route(`${ prefix }/Match`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminMatchController.index
        )
        .post(
            Multer.none,
            AdminMatchController.store
        )

    router
        .route(`${ prefix }/Match/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminMatchController.index
        )
        .patch(
            Multer.simple('department'),
            AdminMatchController.update
        )
        // .delete(
        //     AdminMatchController.destroy
        // )
}
