import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminOrderController } from './order.controller.admin'





export const AdminOrderRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin
    router
    .route(`${ prefix }/ordersend`)  // domain:8000/api/v1/admin/categorys
    .get(
        AdminOrderController.indexsend
    )
    router
        .route(`${ prefix }/order`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminOrderController.index
        )
        .post(
            Multer.simple2("files"),
            AdminOrderController.store
        )

    router
        .route(`${ prefix }/action_order/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminOrderController.show
        )
        .patch(
            Multer.none,
            AdminOrderController.update
        )

}
