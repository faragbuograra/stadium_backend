import { Router } from "express";
import { errorHandler } from "../Middlewares/error.handler";
import { JWT } from "../Middlewares/Jwt";
import { Locale } from "../Middlewares/locale";
import { RoleMiddleware } from "../Middlewares/RoleMiddleware";
import { PublicAuthRoutes } from "../Modules/Auth/auth.routs";
import { AdminUserRoutes, UserRoutes } from "../Modules/Users/user.routes";


import { AdminSystemInfoRoutes, PublicSystemInfoRoutes } from "../Modules/SystemInfo/systemInfo.routes";


import { me } from "../Modules/Auth/me";


// import { AdminDecisionsRoutes } from "../Modules/Decisions/decisions.routes";
import { AdminDepartmentRoutes } from "../Modules/Department/department.routes";

import { GetStatics } from "./statistics.route";
import { AdminManagementRoutes } from "../Modules/Management/management.routes";
import { AdminProcurementRoutes } from "../Modules/Procurement/procurement.routes";
import { AdminProcurementhistoryRoutes } from "../Modules/Procurementhistory/procurementhistory.routes";
import { AdminMatchRoutes } from "../Modules/Match/match.routes";
import { AdminTypeRoutes } from "../Modules/Types/type.routes";
import { AdminOrderRoutes } from "../Modules/Orders/order.routes";
import { AdminOrder_procurementRoutes } from "../Modules/Order_procurement/order_procurement.routes";
import { AdminStadiumRoutes } from "../Modules/stadium/stadium.routes";
// import { AdminLogRoutes } from "../Modules/log/Log.routes";



export const applyRoutes = (): Router => {
  const router = Router();

  /**
   * -------------------------------------------------------
   * Authentication, Authorization and locale middlewares are first
   * to be registered on the Router
   * -------------------------------------------------------
   * */
  // TODO: add (authentication) and locale middlewares here

  router.use(Locale);

  /**
   * -------------------------------------------------------
   * All application routes can go here
   * -------------------------------------------------------
   * */
  const prefix = "/api/v1";

  const user_prefix = prefix + "/user"; // domain:8000/api/v1/user
  const admin_prefix = prefix + "/admin"; 
  /**
   * ------------------------------------------------------------------------------
   *  PUBLIC ROUTES
   * ------------------------------------------------------------------------------
   */
  // domain:8000/api/v1
  // insert any public middlewares above this line;

  PublicAuthRoutes(router, prefix);
  router.use(JWT);

  // PublicSystemInfoRoutes(router, prefix);



  // PublicDecisionsRoutes(router, prefix);

  // PublicDepartmentRoutes(router, prefix);

  /**
   * ------------------------------------------------------------------------------
   *  USER ROUTES
   * ------------------------------------------------------------------------------
   */
  // router.use(user_prefix, RoleMiddleware(2));



  router.get(`${prefix}/me`, me);

  

 
  /**
   * ------------------------------------------------------------------------------
   *  ADMIN ROUTES
   * ------------------------------------------------------------------------------
   */
  // router.use( admin_prefix, RoleMiddleware('admin'));

  AdminStadiumRoutes(router, admin_prefix);
  AdminSystemInfoRoutes(router, admin_prefix);
  AdminDepartmentRoutes(router, admin_prefix)
  AdminOrderRoutes(router, admin_prefix)
  AdminOrder_procurementRoutes(router, admin_prefix)
  AdminTypeRoutes(router, admin_prefix)
  AdminMatchRoutes(router, admin_prefix)
  AdminProcurementhistoryRoutes(router, admin_prefix)
  AdminUserRoutes(router, admin_prefix);
  AdminProcurementRoutes(router, admin_prefix);
  router.get(`${admin_prefix}/statistics`, GetStatics);
  /**
   * ------------------------------------------------------------------------------
   * !!!! The Error handler is the last middleware on the router !!!!
   * ------------------------------------------------------------------------------
   * */
  router.use(errorHandler);

  return router;
};
