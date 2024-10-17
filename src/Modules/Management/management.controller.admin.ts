 import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import Management                               from './management.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'

export const AdminManagementController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Management.query()
        return await UtilDatabase
            .finder(Management, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    show: async (req: Request, res: Response, next: NextFunction) => {

        let query = Management.query()
        .withGraphFetched('Departments')
        .findById(req.params.id)


            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body
        const img  = req.file
   
        const trx = await Management.startTransaction()
        data.status = true
        try {
            // store file

       
            await Management
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
   
        const trx = await Management.startTransaction()
     
        try {
            // store file

            if (img) {
                data.img = img.filename
                console.log(data)
            }
        await Management
            .query(trx)
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'Management not found!' })
            .then((result) => res.json(result))
            await trx.commit()
        } catch (err) {
            // Delete file
            if (img) {
                const img_path = path.resolve(UPLOADS_PATH, 'Managements', img.filename)
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

        await Management
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'Management not found!' })
            .returning('*')
            .then((result) => res.json(result))
            .catch(err => next(err))

    }

}
