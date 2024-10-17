import { NextFunction, Request, Response } from 'express'


import { ValidationError }                 from 'objection'
import { User }                            from './user.model'
import { UtilDatabase } from '../../Utils/finder'

export const UserController = {

    /**
     * ---------------------------------------------------------------------
     * Update user profile
     * ---------------------------------------------------------------------
     */

update: async (req: Request, res: Response, next: NextFunction) => {
    //chuck the id from the body
    if ('is_disabled' in req.body) {
                    // data.is_disabled = booleanParser(data.is_disabled)
                    delete req.body.is_disabled
                }

    await User.query()
    .patchAndFetchById(req.params.id, req.body)
    .throwIfNotFound({ message: 'User not found!' })
      .then((result: any) => res.json(result))
      .catch((err) => next(err));
  },
    /**
     * ---------------------------------------------------------------------
     * delete user profile
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = User.query()
           .select('id','name')
              .where('status', true)
    
        return await UtilDatabase.finder(User, req.query, query)
            .then((results) => res.json(results))
            .catch((err) => next(err));
    },



    /**
     * ---------------------------------------------------------------------
     * Active phone number
     * ---------------------------------------------------------------------
     */
    activePhone: async (req: Request, res: Response, next: NextFunction) => {
        var data = req.body
       data.phoneIsActive = 1
    
       //check if the phone number is in data
        if (!data.phone) {
            return next(new ValidationError({
                message: 'Phone number is required!',
                type: 'ModelValidation',
                data: {
                    phone: 'Phone number is required!',
                },
            }))
        }

        console.log(data)


      await User
            .query()
        //where phone number is equal to the phone number in the body
            .where('phone', data.phone)
            //update the phoneIsActive to 1
            .patch({ phoneIsActive: '1' })
            .throwIfNotFound({ message: 'User not found!' })
            .then((result) => {
                return res.status(200).json({message: 'phone is active'})
            })
            .catch(err => next(err))
    },

}
