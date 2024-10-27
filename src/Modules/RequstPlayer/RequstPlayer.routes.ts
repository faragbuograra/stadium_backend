import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminRequstPlayerController } from './RequstPlayer.controller.admin'

// import { PublicRequstPlayerController } from './department.controller.public'


// export const PublicRequstPlayerRoutes = (router: Router, prefix: string) => {
//     router.get(`${ prefix }/departments`, PublicRequstPlayerController.index)
//     router.get(`${ prefix }/departments/:id`, PublicRequstPlayerController.show)
// }

export const AdminRequstPlayerRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin
    router
    .route(`${ prefix }/myRequstPlayer`)  // domain:8000/api/v1/admin/categorys
    .get(
        AdminRequstPlayerController.me
    )
    router
        .route(`${ prefix }/RequstPlayer`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminRequstPlayerController.index
        )
        .post(
            Multer.none,
            AdminRequstPlayerController.store
        )

    router
        .route(`${ prefix }/RequstPlayer/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminRequstPlayerController.index
        )
        .patch(
            Multer.simple('department'),
            AdminRequstPlayerController.update
        )
        // .delete(
        //     AdminRequstPlayerController.destroy
        // )
}
