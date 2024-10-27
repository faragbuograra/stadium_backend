 import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import RequstPlayer                               from './RequstPlayer.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'
import { isBefore, parseISO } from 'date-fns';
export const AdminRequstPlayerController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = RequstPlayer.query()
        .withGraphFetched('[user,stadium]') 
        return await UtilDatabase
            .finder(RequstPlayer, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    me: async (req: Request, res: Response, next: NextFunction) => {

        let query = RequstPlayer.query()
        .where('user_id', req.user.id)
        .withGraphFetched('[user,stadium]') 
        return await UtilDatabase
            .finder(RequstPlayer, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const trx = await RequstPlayer.startTransaction();
      
        try {
          // إضافة user_id إلى البيانات
          data.user_id = req.user.id;
      
          // التحقق من اليوم والوقت
          const RequstPlayerDateTime = parseISO(`${data.day}T${data.time}`);
          const now = new Date();
      
          if (isBefore(RequstPlayerDateTime, now)) {
            return res.status(400).json({
              message: 'لا يمكن حجز مباراة بتاريخ أو وقت سابق. يرجى اختيار موعد آخر.',
            });
          }
     
       
          // إدراج البيانات في قاعدة البيانات
          const result = await RequstPlayer.query(trx).insert({
            match_id: data?.match_id,
            user_id: data?.user_id,
            number_of_players: data?.number_of_players,

          });
      
          // تأكيد المعاملة
          await trx.commit();
      
          // إعادة النتيجة في الاستجابة
          res.json(result);
        } catch (err) {
          // التراجع عن المعاملة في حالة الخطأ
          await trx.rollback();
          next(err);
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
   
        const trx = await RequstPlayer.startTransaction()

        try {
            // store file

            if (img) {
                data.img = img.filename
                console.log(data)
            }
        await RequstPlayer
            .query(trx)
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'RequstPlayer not found!' })
            .then((result) => res.json(result))
            await trx.commit()
        } catch (err) {
            // Delete file
            if (img) {
                const img_path = path.resolve(UPLOADS_PATH, 'RequstPlayers', img.filename)
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
        await RequstPlayer
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'RequstPlayer not found!' })
            .returning('*')
            .then((result) => res.json(result))
            .catch(err => next(err))

    }

}
