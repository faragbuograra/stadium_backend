import { NextFunction, Request, Response } from "express"
import { UtilDatabase }                    from '../../Utils/finder'
import SystemInfo                               from './systemInfo.model'

export const PublicSystemInfoController = {

    /**
     * ---------------------------------------------------------------------
     * View index of a model
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = SystemInfo.query()

        return await UtilDatabase
            .finder(SystemInfo, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))
    },

    /**
     * ---------------------------------------------------------------------
     * View a single model
     * ---------------------------------------------------------------------
     */
    show: async (req: Request, res: Response, next: NextFunction) => {

        await SystemInfo
            .query()
            .findById(req.params.id)
            // .withGraphFetched(`[movies]`)
            .throwIfNotFound({ message: 'SystemInfo not found!' })
            .then((result: SystemInfo) => res.json(result))
            .catch(err => next(err))
    }
}
