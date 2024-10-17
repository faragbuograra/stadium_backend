 import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'

import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'
import Order_procurement from './order_procurement.model';

export const AdminOrder_procurementController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Order_procurement.query()
        .where('status', 'wherehouse')
    
        return await UtilDatabase
            .finder(Order_procurement, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    show: async (req: Request, res: Response, next: NextFunction) => {

        let query = Order_procurement.query()
       
        .findById(req.params.id)


            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body
 

       
   
        const trx = await Order_procurement.startTransaction()
        data.status = true
        data.user_id = req.user?.id;
        try {
            
        
            await Order_procurement
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
    
   
        const trx = await Order_procurement.startTransaction()
     
        try {
            // store file

          
        await Order_procurement
            .query(trx)
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'Order_procurement not found!' })
            .then((result) => res.json(result))
            await trx.commit()
        } catch (err) {
            // Delete file
           

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

        await Order_procurement
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'Order_procurement not found!' })
            .returning('*')
            .then((result) => res.json(result))
            .catch(err => next(err))

    }

}
