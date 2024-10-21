import { NextFunction, Request, Response } from "express";
import { UtilDatabase } from "../../Utils/finder"
import { User } from "./user.model"

export const AdminUserController = {
  /**
   * ---------------------------------------------------------------------
   * View index of a model
   * ---------------------------------------------------------------------
   */
  index: async (req: Request, res: Response, next: NextFunction) => {
    let query = User.query()
    .where('role', 'admin')

    return await UtilDatabase.finder(User, req.query, query)
      .then((results) => res.json(results))
      .catch((err) => next(err));
  },
  Players: async (req: Request, res: Response, next: NextFunction) => {
    let query = User.query()
    .where('role', 'player')

    return await UtilDatabase.finder(User, req.query, query)
      .then((results) => res.json(results))
      .catch((err) => next(err));
  },
  MStadium: async (req: Request, res: Response, next: NextFunction) => {
    let query = User.query()
    .where('role', 'mstadium')

    return await UtilDatabase.finder(User, req.query, query)
      .then((results) => res.json(results))
      .catch((err) => next(err));
  },
  /**
   * ---------------------------------------------------------------------
   * View a single model
   * ---------------------------------------------------------------------
   */
  show: async (req: Request, res: Response, next: NextFunction) => {
    await User.query()
      .findById(req.params.id)
      // .withGraphFetched(`[role,department,management]`)
      .throwIfNotFound({ message: "User not found!" })
      .then((result: User) => res.json(result))
      .catch((err) => next(err));
  },

  /**
   * ---------------------------------------------------------------------
   * post a single model
   * ---------------------------------------------------------------------
   */
  store: async (req: Request, res: Response, next: NextFunction) => {
   

    await User.query()
      .insert(req.body)
      .then((result: any) => res.json(result))
      .catch((err) => next(err));
  },
   /**
   * ---------------------------------------------------------------------
   * update a single model
   * ---------------------------------------------------------------------
   */
  update: async (req: Request, res: Response, next: NextFunction) => {
    //chuck the id from the body
 

    await User.query()
    .patchAndFetchById(req.params.id, req.body)
    .throwIfNotFound({ message: 'User not found!' })
      .then((result: any) => res.json(result))
      .catch((err) => next(err));
  },
  resetpassword: async (req: Request, res: Response, next: NextFunction) => {
    //resetpassword
    const data = req.body
  const id = req.user.id;


    await User.query()
    .patchAndFetchById(id, data)
    .throwIfNotFound({ message: 'User not found!' })
      .then((result: any) => res.json(result))
      .catch((err) => next(err));
  }
};

