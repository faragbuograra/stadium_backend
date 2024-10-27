import { NextFunction, Request, Response } from "express"
import { UtilDatabase }                    from '../../Utils/finder'
import Stadium                               from './stadium.model'

export const PublicStadiumController = {

    /**
     * ---------------------------------------------------------------------
     * View index of a model
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Stadium.query()
        // add where status = true
        query.where('status', 'true')

        return await UtilDatabase
            .finder(Stadium, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))
    },

    /**
     * ---------------------------------------------------------------------
     * View a single model
     * ---------------------------------------------------------------------
     */
    show: async (req: Request, res: Response, next: NextFunction) => {

        await Stadium
            .query()
            .findById(req.params.id)
            // .withGraphFetched(`[movies]`)
            .throwIfNotFound({ message: 'Stadium not found!' })
            .then((result: Stadium) => res.json(result))
            .catch(err => next(err))
    }
}
