 import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import Match                               from './match.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'

export const AdminMatchController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Match.query()
        .withGraphFetched('[user,stadium]') 
        return await UtilDatabase
            .finder(Match, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        var data = req.body
        const img  = req.file

        const trx = await Match.startTransaction()
      
        try {
          data.user_id = req.user.id
       
            await Match
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

        var data   = req.body
        const { id } = req.params
        const img  = req.file
   
        const trx = await Match.startTransaction()

        try {
            // store file

            if (img) {
                data.img = img.filename
                console.log(data)
            }
        await Match
            .query(trx)
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'Match not found!' })
            .then((result) => res.json(result))
            await trx.commit()
        } catch (err) {
            // Delete file
            if (img) {
                const img_path = path.resolve(UPLOADS_PATH, 'Matchs', img.filename)
                await unlink(img_path);

                console.log(`successfully deleted ${ img_path }`);
            }

            await trx.rollback()
            return next(err)}

    },


    /**
     * ---------------------------------------------------------------------
     * Destroy an instance of a model
     * ---------------------------------------------------------------------
     */
    destroy: async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params
console.log(id)
        await Match
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'Match not found!' })
            .returning('*')
            .then((result) => res.json(result))
            .catch(err => next(err))

    }

}
