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
      // .withGraphFetched(`[role,department,management]`)
  

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
    await validateUser(req, res);

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

async function validateUser(req: Request, res: Response) {
  let errors: any = [];
  if (req.body.username) {
    const user = await User.query().findOne({ username: req.body.username });
    if (user) {
      errors.push({ username: `The username ${req.body.username} is already exist` });
    }
  } else {
    errors.push({ username: `The username is required` });
  }
 
  if (req.body.password) {
  } else {
    errors.push({ password: `The password is required` });
  }
  if (req.body.management_id) {
  } else {
    errors.push({ management_id: `The management_id is required` });
  }
  let errorsObject = {};

  errors.forEach(error => {
      for (let field in error) {
          errorsObject[field] = error[field];
      }
  });

  if (errors.length > 0) {
    return res.status(400).json({
      errors: errorsObject,
      message: "Validation error",
    });
  }
}
