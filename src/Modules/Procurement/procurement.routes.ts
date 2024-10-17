import { Router } from "express";
import { Multer } from "../../Middlewares/multer";
import { AdminProcurementController } from "./procurement.controller.admin";

export const AdminProcurementRoutes = (router: Router, prefix: string) => {
  // TODO: add insert, update and delete to admin
  router
  .route(`${prefix}/showMaxIndex/:id`) // domain:8000/api/v1/admin/categorys/1
  .get(
    //to do
    AdminProcurementController.showMaxIndex
  )
  router
    .route(`${prefix}/procurements`) // domain:8000/api/v1/admin/categorys
    .get(AdminProcurementController.index)
    .post(Multer.simple2("files"), AdminProcurementController.store);
  router
    .route(`${prefix}/procurement/procurementhistory`) // domain:8000/api/v1/admin/categorys
    .get(AdminProcurementController.indexProcurementhistory);
  router
    .route(`${prefix}/procurement/:id`) // domain:8000/api/v1/admin/categorys/1
    .get(
      //to do
      AdminProcurementController.show
    )
    .patch(Multer.simple2("files"), AdminProcurementController.update)
    .delete(AdminProcurementController.destroy);
};
