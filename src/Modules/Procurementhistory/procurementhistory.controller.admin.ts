 import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import Procurementhistory                               from './procurementhistory.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'
import { Console } from 'console';

export const AdminProcurementhistoryController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {
        var { form, to } = req.query;

        // Validate the dates (you can use a library like 'express-validator' for more robust validation)
        if (!form || !to) {
            return res.status(400).json({ error: 'Both form and to dates are required' });
        }

        const startDate = new Date(form  as any);
        const endDate = new Date(to  as any);

        // Check if the dates are valid
        if (isNaN(startDate  as any) || isNaN(endDate  as any)) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Construct the base query
        let query = Procurementhistory.query()
            .select('id', 'index', 'companyName', 'SN', 'price', 'status', 'created_at')
            .whereBetween('created_at', [startDate, endDate]);


    return await UtilDatabase
        .finder(Procurementhistory, req.query, query)
        
        .then((results) => res.json(results))
        .catch(err => next(err))

    },
    show: async (req: Request, res: Response, next: NextFunction) => {

        let query = Procurementhistory.query()
        .withGraphJoined('[Management,Department,DepartmentTo,ManagementTo]')
        .findById(req.params.id)


            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        var data = req.body;
        const file = req.files;
 console.log(data)
        const trx = await Procurementhistory.startTransaction();
        
        try {
            // Store file
            if (file) {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().substring(0, 10);
                data.file = formattedDate+'/'+file[0].filename;

            }
        
            // Calculate batch number based on current date
            const today = new Date();
          //2024-04-29 12:42:30.71
            today.setHours(0, 0, 0, 0);
          
        
         

   
            await Procurementhistory
                .query(trx)
                .insert(data)
                .then((result) => res.json(result));
      await trx.commit();
        } catch (err) {
            // Delete file
            if (file) {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().substring(0, 10);
                data.file = formattedDate+'/'+file[0].filename;
                const img_path = path.resolve(UPLOADS_PATH, 'files',   data.file)
                await unlink(img_path);

              
            }
            await trx.rollback();
            return next(err);
        }},
    /**
     * ---------------------------------------------------------------------
     * Update an existing instance of a model
     * ---------------------------------------------------------------------
     */
    update: async (req: Request, res: Response, next: NextFunction) => {

        var data   = req.body
        const { id } = req.params
        const file  = req.file
   
        const trx = await Procurementhistory.startTransaction()

  try {
        await Procurementhistory
            .query(trx)
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'Procurementhistory not found!' })
            .then((result) => res.json(result))
            await trx.commit()
        } catch (err) {
          

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

        await Procurementhistory
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'Procurementhistory not found!' })
            .returning('*')
            .then((result) => res.json(result))
            .catch(err => next(err))

    }

}
