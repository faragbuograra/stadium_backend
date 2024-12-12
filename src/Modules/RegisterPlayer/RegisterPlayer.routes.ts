import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminRegisterPlayerController } from './RegisterPlayer.controller.admin'

// import { PublicRegisterPlayerController } from './department.controller.public'


// export const PublicRegisterPlayerRoutes = (router: Router, prefix: string) => {
//     router.get(`${ prefix }/departments`, PublicRegisterPlayerController.index)
//     router.get(`${ prefix }/departments/:id`, PublicRegisterPlayerController.show)
// }

export const AdminRegisterPlayerRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin
    router
    .route(`${ prefix }/myRegisterPlayer`)  // domain:8000/api/v1/admin/categorys
    .get(
        AdminRegisterPlayerController.me
    )
    router
        .route(`${ prefix }/RegisterPlayer`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminRegisterPlayerController.index
        )
        .post(
            Multer.none,
            AdminRegisterPlayerController.store
        )

    router
        .route(`${ prefix }/RegisterPlayer/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminRegisterPlayerController.index
        )
        .patch(
            Multer.simple('department'),
            AdminRegisterPlayerController.update
        )
        // .delete(
        //     AdminRegisterPlayerController.destroy
        // )
}
