import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import SystemInfo                               from './systemInfo.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'

export const AdminSystemInfoController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = SystemInfo.query()

        return await UtilDatabase
            .finder(SystemInfo, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body
        const img  = req.file

        const trx = await SystemInfo.startTransaction()

        try {
            // store file

            if (img) {
                data.img = img.filename
            }
            await SystemInfo
                .query(trx)
                .insert(data)
                .then((result) => res.json(result))

            await trx.commit()
        } catch (err) {
            // Delete file
            if (img) {
                const img_path = path.resolve(UPLOADS_PATH, 'SystemInfos', img.filename)
                await unlink(img_path);

                console.log(`successfully deleted ${ img_path }`);
            }

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

        await SystemInfo
            .query()
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'SystemInfo not found!' })
            .then((result) => res.json(result))
            .catch(err => next(err))
    },


    /**
     * ---------------------------------------------------------------------
     * Destroy an instance of a model
     * ---------------------------------------------------------------------
     */
    destroy: async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        await SystemInfo
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'SystemInfo not found!' })
            .returning('*')
            .then((result) => res.json(result))
            .catch(err => next(err))

    }

}
