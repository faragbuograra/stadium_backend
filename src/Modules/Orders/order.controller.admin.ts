 import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import Order                               from './order.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'

export const AdminOrderController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Order.query()
        .where('status', 'true')
       
        .withGraphJoined("[user]")
        return await UtilDatabase
            .finder(Order, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    indexsend: async (req: Request, res: Response, next: NextFunction) => {

        let query = Order.query()
        .where('status', 'send')
       
        .withGraphJoined("[user]")
        return await UtilDatabase
            .finder(Order, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    show: async (req: Request, res: Response, next: NextFunction) => {

        let query = Order.query()
        .withGraphJoined("[Order_procurement,user]")
        .where('Order_procurement.status', 'true')
        .findById(req.params.id)
        .throwIfNotFound({ message: 'Order not found!' })


            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body
        const file = req.files;

        delete data.attachment;
   
        const trx = await Order.startTransaction()
        data.status = true
        data.user_id = req.user?.id;
        try {
            if (file && file[0]) {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().substring(0, 10);
                data.file = formattedDate + "/" + file[0]?.filename;
              }
        
            await Order
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
        console.log(data)
        const { id } = req.params
    
        const trx = await Order.startTransaction()
     
        try {
            // store file

        await Order
            .query(trx)
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'Order not found!' })
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

        await Order
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'Order not found!' })
            .returning('*')
            .then((result) => res.json(result))
            .catch(err => next(err))

    }

}
