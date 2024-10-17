import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminProcurementhistoryController } from './procurementhistory.controller.admin'


export const AdminProcurementhistoryRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/procurementhistory`)  // domain:8000/api/v1/admin/categorys
        .get(
            AdminProcurementhistoryController.index
        )
        .post(
            Multer.simple2('files'),
            AdminProcurementhistoryController.store
        )

    router
        .route(`${ prefix }/procurementhistory/:id`) // domain:8000/api/v1/admin/categorys/1
        .get(
            //to do 
            AdminProcurementhistoryController.update
        )
        .patch(
            Multer.simple('files'),
            AdminProcurementhistoryController.update
        )
        .delete(
            AdminProcurementhistoryController.destroy
        )
}
