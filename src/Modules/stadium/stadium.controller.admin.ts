import { NextFunction, Request, Response } from 'express'
import path                                from 'path'

import Stadium                               from './stadium.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'

export const AdminStadiumController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Stadium.query()

        return await UtilDatabase
            .finder(Stadium, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body
        const img  = req.file
     
        const trx = await Stadium.startTransaction()

        try {
            // store file

        
          data.status=true
            await Stadium
                .query(trx)
                .insert(data)
                .then((result) => res.json(result))

            await trx.commit()
        } catch (err) {
            // Delete file
         

            await trx.rollback()
            return next(err)
        }

    },

    /**
     * ---------------------------------------------------------------------
     * Update an existing instance of a model
     * ---------------------------------------------------------------------
     */
    update: async (req: Request, res: Response, next: NextFunction) => {

        const data   = req.body
        const { id } = req.params
        //check if file is uploaded
        const img = req.file
        const trx = await Stadium.startTransaction()
     
        try {
           //delete old file
            const oldStadium = await Stadium.query().findById(id)
         

            

        await Stadium
            .query()
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'Stadium not found!' })
            .then((result) => res.json(result))
            .catch(err => next(err))
        } catch (err) {
            // Delete file
         

        }
    },


    // /**
    //  * ---------------------------------------------------------------------
    //  * Destroy an instance of a model
    //  * ---------------------------------------------------------------------
    //  */
    // destroy: async (req: Request, res: Response, next: NextFunction) => {

    //     const { id } = req.params

    //     await Stadium
    //         .query()
    //         .deleteById(id)
    //         .throwIfNotFound({ message: 'Stadium not found!' })
    //         .returning('*')
    //         .then((result) => res.json(result))
    //         .catch(err => next(err))

    // }

}
