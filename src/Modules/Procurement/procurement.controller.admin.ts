import { NextFunction, Request, Response } from "express";
import Procurement from "./procurement.model"; 
import { UtilDatabase } from "../../Utils/finder";
import Procurementhistory from "../Procurementhistory/procurementhistory.model";

export const AdminProcurementController = {
  //index
  index: async (req: Request, res: Response, next: NextFunction) => {
    // Retrieve query parameters
    var { form, to } = req.query;

    // Validate the dates (you can use a library like 'express-validator' for more robust validation)
    if (!form || !to) {
      return res
        .status(400)
        .json({ error: "Both form and to dates are required" });
    }

    const startDate = new Date(form as any);
    const endDate = new Date(to as any);

    // Check if the dates are valid
    if (isNaN(startDate as any) || isNaN(endDate as any)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Construct the base query
    let query = Procurement.query()
    .withGraphJoined("[user]")
    .select(
      "procurement.id",
      "procurement.name",
      "procurement.batchNo",
      "procurement.management_idTo",
      "procurement.index",
      "procurement.SN",
      "procurement.price",
      "procurement.user_id",
      "procurement.type",
      "procurement.companies_id",
      "procurement.created_at",
      "procurement.file",
      "user.name as user:name",
      "user.id as user:id",
      // "types.name as types:name",
      // "types.id as types:id",
      // "types.code as types:code"
    )  

      .whereBetween("created_at", [startDate, endDate]);

    return await UtilDatabase.finder(Procurement, req.query, query)

      .then((results) => res.json(results))
      .catch((err) => next(err));
  },
  indexProcurementhistory: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let query = Procurement.query()
      .select("id", "SN")
      .then((results) => res.json({ data: results }))
      .catch((err) => next(err));
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    let query = Procurement.query()
      .withGraphJoined("[Management,ManagementTo]")
      .findById(req.params.id)
      .then((results) => {
        if (!results) {
          return res.status(404).json({ message: "Procurement not found!" });
        }
        Procurementhistory.query()
          .where("procurement_id", req.params.id)
          .select("management_id", "management_idTo")
          .then((procurementhistory) => {
            results.procurementhistory = procurementhistory;
            return res.json(results);
          });
      })
      .catch((err) => next(err));
  },
  showMaxIndex: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.id);
    let query = Procurement.query()
        .max("index as maxIndex")
    .where("type", req.params.id)
    .first()
      .then((results) => {
        console.log(results);
        if (!results) {
          return res.json(
            {
              maxIndex: 0,
            }
          );
        }
        if (results.maxIndex == null) {
          return res.json(
            {
              maxIndex: 0,
            }
          );
        }
        return res.json(results);
      })
      .catch((err) => next(err));
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    var data = req.body;
    const file = req.files;

    delete data.attachment;
    const trx = await Procurement.startTransaction();

    try {
      //
      if (file && file[0]) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substring(0, 10);
        data.file = formattedDate + "/" + file[0]?.filename;
      }

      // Calculate batch number based on current date
      const today = new Date();
      //2024-04-29 12:42:30.71
      today.setHours(0, 0, 0, 0);

      // Get the maximum batch number for the current day from the table
      const maxBatch = await Procurement.query()

        .where("created_at", ">=", today)
        .where("created_at", "<", new Date(today.getTime() + 86400000))

        .max("batchNo as maxBatchNo")
        .first();

      // If there are no records for the current day, start from 0; otherwise, increment the maximum batch number by 1
      data.batchNo = Number(maxBatch?.maxBatchNo) + 1;
      data.user_id = req.user?.id;
      await Procurement.query(trx)
        .insert(data)
        .then((result) => res.json(result));
      await trx.commit();
    } catch (err) {
      // Delete file
      await trx.rollback();
      return next(err);
    }
  },
  /**
   * ---------------------------------------------------------------------
   * Update an existing instance of a model
   * ---------------------------------------------------------------------
   */
  update: async (req: Request, res: Response, next: NextFunction) => {
    var data = req.body;
    data.user_id = req.user?.id;
    const file = req.files;
    const { id } = req.params;
console.log(data)
    const trx = await Procurement.startTransaction();

    try {
      if (file && file[0]) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substring(0, 10);
        data.file = formattedDate + "/" + file[0]?.filename;
      }
      if (data.what == "move") {
        var procurement = await Procurement.query().findById(id);

        if (!procurement) {
          return res.status(404).json({ message: "Procurement not found!" });
        } else {
          var procurementhistory = await Procurementhistory.query().insert({
            procurement_id: procurement.id,
            type: procurement.type,
            batchNo: procurement.batchNo,
            management_id: procurement.management_id,
            department_id: procurement.department_id,
            index: procurement.index,
            name: procurement.name,
            what: "move",
            buildName: procurement.buildName,
            companies_id: procurement.companies_id,
            management_idTo: data.management_idTo,
            department_idTo: data.department_idTo,
            SN: procurement.SN,
            price: procurement.price,
            user_id: procurement.user_id,
            description: procurement.description,
            date: procurement.date,
          });
        }
      }

      await Procurement.query(trx)
        .patchAndFetchById(id, data)
        .throwIfNotFound({ message: "Procurement not found!" })
        .then((result) => res.json(result));
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      return next(err);
    }
  },

  /**
   * ---------------------------------------------------------------------
   * Destroy an instance of a model
   * ---------------------------------------------------------------------
   */
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await Procurement.query()
      .deleteById(id)
      .throwIfNotFound({ message: "Procurement not found!" })
      .returning("*")
      .then((result) => res.json(result))
      .catch((err) => next(err));
  },
};
