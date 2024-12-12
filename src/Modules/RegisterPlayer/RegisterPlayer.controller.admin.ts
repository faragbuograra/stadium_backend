 import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import RegisterPlayer                               from './RegisterPlayer.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'
import { isBefore, parseISO } from 'date-fns';
import RequstPlayer from '../RequstPlayer/RequstPlayer.model';
export const AdminRegisterPlayerController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = RegisterPlayer.query()
        .withGraphFetched('[user,match]') 
        return await UtilDatabase
            .finder(RegisterPlayer, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    me: async (req: Request, res: Response, next: NextFunction) => {

        let query = RegisterPlayer.query()
        .where('user_id', req.user.id)
        // .withGraphFetched('[user,stadium]') 
        return await UtilDatabase
            .finder(RegisterPlayer, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const trx = await RegisterPlayer.startTransaction();
      
        try {
          // إضافة user_id إلى البيانات
          data.user_id = req.user.id;
      
          // التحقق من اليوم والوقت
          const RegisterPlayerDateTime = parseISO(`${data.day}T${data.time}`);
          const now = new Date();
      
          if (!isBefore(RegisterPlayerDateTime, now)) {
            return res.status(400).json({
              message: 'لا يمكن حجز مباراة بتاريخ أو وقت سابق. يرجى اختيار موعد آخر.',
            });
          }
      // if user is already registerd in this match
          const isRegistered = await RegisterPlayer.query()
            .findOne({
              user_id: data.user_id,
              requst_player_id: data.requst_player_id,
            });
            if (isRegistered) {
              return res.status(400).json({
                message: 'لقد سجلت بالفعل في هذه المباراة.',
              });
            }
     
       
          // إدراج البيانات في قاعدة البيانات
          const result = await RegisterPlayer.query(trx).insert({
            user_id: data.user_id,
            requst_player_id: data.requst_player_id,

          });
          await trx.commit();
         
          const requst_player = await RequstPlayer.query()
          .updateAndFetchById(
            data.requst_player_id,
            {
              number_of_players: data.number_of_players - 1,
            }
          );
console.log(requst_player)
          
      
          // تأكيد المعاملة
      
      
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
   
        const trx = await RegisterPlayer.startTransaction()

        try {
            // store file

            if (img) {
                data.img = img.filename
                console.log(data)
            }
        await RegisterPlayer
            .query(trx)
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'RegisterPlayer not found!' })
            .then((result) => res.json(result))
            await trx.commit()
        } catch (err) {
            // Delete file
            if (img) {
                const img_path = path.resolve(UPLOADS_PATH, 'RegisterPlayers', img.filename)
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
        await RegisterPlayer
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'RegisterPlayer not found!' })
            .returning('*')
            .then((result) => res.json(result))
            .catch(err => next(err))

    }

}
