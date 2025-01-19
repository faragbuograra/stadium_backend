 import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import Match                               from './match.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'
import { isBefore, parseISO } from 'date-fns';
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
    me: async (req: Request, res: Response, next: NextFunction) => {
if(req.user.role=='player'){
        let query = Match.query()
        .where('user_id', req.user.id)
        .withGraphFetched('[user,stadium]') 
        return await UtilDatabase
            .finder(Match, req.query, query)
            
            .then((results) => res.json(results))
            .catch(err => next(err))
}else{
  let query = Match.query()
  .join('stadium', 'stadium.id', 'match.stadium_id') // Explicitly join the stadium table
  .where('stadium.user_id', req.user.id) // Filter by stadium.user_id
  .withGraphFetched('[user, stadium]'); // Fetch related data

// Use a utility function to handle additional query options (e.g., pagination)
const results = await UtilDatabase.finder(Match, req.query, query);

// Send the results as JSON
res.json(results);
    };
  },
    store: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const trx = await Match.startTransaction();
      
        try {
          // إضافة user_id إلى البيانات
          data.user_id = req.user.id;
      
          // التحقق من اليوم والوقت
          const matchDateTime = parseISO(`${data.day}T${data.time}`);
          const now = new Date();
      
          if (isBefore(matchDateTime, now)) {
            return res.status(400).json({
              message: 'لا يمكن حجز مباراة بتاريخ أو وقت سابق. يرجى اختيار موعد آخر.',
            });
          }
          const existingMatch = await Match.query(trx)
          .where('day', data.day)
          .andWhere('time', data.time)
          .andWhere('stadium_id', data.stadium_id)
          .first();
    
        if (existingMatch) {
          return res.status(400).json({
            message: 'يوجد مباراة محجوزة في نفس اليوم والوقت في هذا الملعب. يرجى اختيار موعد آخر.',
          });
        }
          // إدراج البيانات في قاعدة البيانات
          const result = await Match.query(trx).insert(data);
      
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
