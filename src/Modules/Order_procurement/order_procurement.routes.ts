import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminOrder_procurementController } from './order_procurement.controller.admin'



export const AdminOrder_procurementRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/Order_procurement`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminOrder_procurementController.index
        )
        .post(
            Multer.none,
            AdminOrder_procurementController.store
        )

    router
        .route(`${ prefix }/Order_procurement/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminOrder_procurementController.show
        )
        .patch(
            Multer.none,
            AdminOrder_procurementController.update
        )
        .delete(
            Multer.none,
            AdminOrder_procurementController.destroy
        )
}
